export function stringify<Key, Value>(map: Map<Key, Value>) {
  return JSON.stringify(map, (_, value: unknown) => {
    if (value instanceof Map) {
      return {
        dataType: 'map',
        value: Array.from(value.entries()),
      };
    } else {
      return value;
    }
  })
}

interface SerializedMap<Key, Value> {
  type: 'map',
  value: [Key, Value][]
}

function isSerializedMap<Key, Value>(object: unknown): object is SerializedMap<Key, Value> {
  return (object as SerializedMap<Key, Value>)?.type === 'map';
}

export function parse<Key, Value>(string: string): Map<Key, Value> {
  return JSON.parse(string, (_, value: unknown | SerializedMap<Key, Value>) => {
    if (typeof value === 'object' && value !== null) {
      if (isSerializedMap(value)) {
        return new Map((value as SerializedMap<Key, Value>).value);
      }
    }
    return value;
  })
}
