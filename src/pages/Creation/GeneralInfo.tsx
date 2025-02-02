import {
  ActionIcon,
  Center,
  Paper,
  RangeSlider,
  SegmentedControl,
  Textarea,
  TextInput,
} from "@mantine/core";
import {
  BASE_STATS,
  BLANK_STATS,
  BugSize,
  CharacterSheet,
} from "../../types/CharacterSheet";
import { ReactNode, useEffect, useState } from "react";
import { useThrottle } from "@utils/hooks";
import {
  FaCircle,
  FaFireFlameCurved,
  FaHeart,
  FaMinus,
  FaPersonRunning,
  FaPlus,
  FaRegCircle,
} from "react-icons/fa6";

interface Props {
  sheet: CharacterSheet;
  setSheet: React.Dispatch<React.SetStateAction<CharacterSheet>>;
}

export default function GeneralInfo({ sheet, setSheet }: Props) {
  const [name, setName] = useState(sheet.name);
  const [player, setPlayer] = useState(sheet.playerName);
  const [description, setDescription] = useState(sheet.description);
  const [size, setSize] = useState(sheet.size);
  const [stats, setStats] = useState(size ? BASE_STATS[size] : BLANK_STATS);
  const [bonusCuteSpook, setBonusCuteSpook] = useState(stats.bonusCuteSpook);
  const [cute, setCute] = useState(stats.cute);
  const [spook, setSpook] = useState(stats.spook);

  useEffect(() => {
    if (size) {
      setStats(BASE_STATS[size]);
      setCute(BASE_STATS[size].cute);
      setBonusCuteSpook(BASE_STATS[size].bonusCuteSpook);
      setSpook(BASE_STATS[size].spook);
    }
  }, [size]);

  // use debounce!!!
  const saveSheet = useThrottle(() => {
    console.log("changed");
    setSheet({
      ...sheet,
      name,
      description,
      size,
      playerName: player,
    });
  }, 1000);
  useEffect(saveSheet, [name, player, description, size]);

  const simpleStatSlot = (name: string, value: number) => {
    return (
      <Paper style={{ display: "flex", flexDirection: "row" }}>
        <Paper style={{ padding: 8, flexGrow: 1 }}>{name}</Paper>
        <Paper
          withBorder={true}
          style={{ padding: 8 }}
          bg="var(--mantine-color-dark-8)"
        >
          {value}
        </Paper>
      </Paper>
    );
  };

  const horizontalStatSlot = (name: string, value: number, icon: ReactNode) => {
    return (
      <Paper style={{ display: "flex", flexDirection: "row" }}>
        <Paper
          style={{
            columnGap: 4,
            flexGrow: 1,
            display: "flex",
            padding: 8,
            alignItems: "center",
          }}
        >
          {icon}
          {name}
        </Paper>
        <Paper
          withBorder={true}
          style={{ padding: 8 }}
          bg="var(--mantine-color-dark-8)"
        >
          {value}
        </Paper>
      </Paper>
    );
  };

  const increaseCounter = (
    value: number,
    setFunction: (value: number) => void,
  ) => {
    return () => {
      if (bonusCuteSpook >= 0.5) {
        setFunction(value + 0.5);
        setBonusCuteSpook(bonusCuteSpook - 0.5);
      }
    };
  };

  const decreaseCounter = (
    baseValue: number,
    value: number,
    setFunction: (value: number) => void,
  ) => {
    return () => {
      if (value - 0.5 >= baseValue) {
        setFunction(value - 0.5);
        setBonusCuteSpook(bonusCuteSpook + 0.5);
      }
    };
  };

  const counterInput = (
    name: string,
    value: number,
    baseValue: number,
    setValue: (newValue: number) => void,
  ) => {
    return (
      <Paper
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Paper style={{ flexGrow: 1, padding: 8 }}>{name}</Paper>
        <ActionIcon.Group>
          <ActionIcon
            variant="default"
            size="lg"
            radius="md"
            disabled={bonusCuteSpook <= 0}
            onClick={increaseCounter(value, setValue)}
          >
            <FaPlus />
          </ActionIcon>
          <ActionIcon.GroupSection
            variant="default"
            size="lg"
            bg="var(--mantine-color-body)"
            miw={60}
          >
            {value}
          </ActionIcon.GroupSection>
          <ActionIcon
            variant="default"
            size="lg"
            radius="md"
            disabled={bonusCuteSpook >= stats.bonusCuteSpook}
            onClick={decreaseCounter(baseValue, value, setValue)}
          >
            <FaMinus />
          </ActionIcon>
        </ActionIcon.Group>
      </Paper>
    );
  };

  const splitBonus = (value: number, baseValue: number) => {
    return [...Array(baseValue / 0.5)]
      .map((_, i) => i * 0.5)
      .map((x) => value > x);
  };

  const hungerRange: [number, number] = [stats.hungerStart, stats.hungerMax];

  return (
    <>
      <p>editing sheet {sheet.key}</p>

      <div style={{ display: "flex", columnGap: 16 }}>
        <TextInput
          style={{ flexGrow: 1 }}
          label="Character name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />

        <TextInput
          style={{ flexGrow: 1 }}
          label="Player name"
          value={player}
          onChange={(e) => setPlayer(e.currentTarget.value)}
        />
      </div>

      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      />

      <h3>Bug Size</h3>
      <div style={{ display: "flex", marginTop: 16 }}>
        <SegmentedControl
          size="lg"
          withItemsBorders={false}
          orientation="vertical"
          value={size}
          onChange={(v: string) => setSize(v as BugSize)}
          data={[
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ]}
        />

        {size && (
          <div
            style={{
              display: "flex",
              columnGap: 32,
              flexGrow: 1,
              paddingInlineStart: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                rowGap: 8,
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              {simpleStatSlot("Might", stats.might)}
              {simpleStatSlot("Insight", stats.insight)}
              {simpleStatSlot("Shell", stats.shell)}
              {simpleStatSlot("Grace", stats.grace)}
            </div>

            <div
              style={{ display: "flex", rowGap: 8, flexDirection: "column" }}
            >
              <div
                style={{ display: "flex", columnGap: 12, flexDirection: "row" }}
              >
                {horizontalStatSlot("Heart", stats.heart, <FaHeart />)}
                {horizontalStatSlot(
                  "Stamina",
                  stats.stamina,
                  <FaPersonRunning />,
                )}
                {horizontalStatSlot("Soul", stats.soul, <FaFireFlameCurved />)}
              </div>

              <div style={{ padding: 8 }}>
                Assign bonus to Cute or Spook:
                <div
                  style={{
                    display: "inline-flex",
                    flexDirection: "row",
                    columnGap: 4,
                    paddingInlineStart: 8,
                  }}
                >
                  {splitBonus(bonusCuteSpook, stats.bonusCuteSpook).map((v) =>
                    v ? (
                      <FaCircle size="0.8rem" />
                    ) : (
                      <FaRegCircle size="0.8rem" />
                    ),
                  )}
                </div>
              </div>
              {counterInput("Cute", cute, stats.cute, setCute)}
              {counterInput("Spook", spook, stats.spook, setSpook)}
            </div>

            <div
              style={{
                display: "flex",
                rowGap: 8,
                flexDirection: "column",
                alignItems: "stretch",
                flexGrow: 2,
              }}
            >
              <div>{simpleStatSlot("Speed", stats.speed)}</div>

              <div>
                Hunger:
                <RangeSlider
                  min={-5}
                  max={30}
                  value={hungerRange}
                  marks={[stats.hungerStart, stats.hungerMax].map((v, i) => ({
                    value: v,
                    label: `${i === 0 ? "min" : "max"}: ${v}`,
                  }))}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        )}

        {!size && (
          <Center style={{ flexGrow: 1 }}>
            <Paper
              style={{ padding: 12 }}
              bg="var(--mantine-color-yellow-light)"
            >
              Choose the size of your bug
            </Paper>
          </Center>
        )}
      </div>
    </>
  );
}
