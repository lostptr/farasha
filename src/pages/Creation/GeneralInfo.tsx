import {
  ActionIcon,
  Button,
  Group,
  Paper,
  RangeSlider,
  Textarea,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { BASE_STATS, BLANK_STATS, BugSize } from "../../types/CharacterSheet";
import { ReactNode, useEffect, useState } from "react";
import {
  FaCheck,
  FaCircle,
  FaFireFlameCurved,
  FaHeart,
  FaMinus,
  FaPersonRunning,
  FaPlus,
  FaRegCircle,
} from "react-icons/fa6";
import { StepProps } from "./types";
import { useField } from "@mantine/form";

export default function GeneralInfo({
  sheet,
  setSheet,
  onBackPressed,
  onNextPressed,
}: StepProps) {
  const validateRequiredField =
    (message: string) => (value: string | undefined) =>
      value ? null : message;
  const nameField = useField({
    initialValue: sheet.name,
    validateOnBlur: true,
    validate: validateRequiredField("The name field is required."),
  });
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
      setBonusCuteSpook(BASE_STATS[size].bonusCuteSpook);
      setCute(BASE_STATS[size].cute);
      setSpook(BASE_STATS[size].spook);
    }
  }, [size]);

  const back = () => {
    onBackPressed();
  };

  const next = () => {
    setSheet({
      ...sheet,
      name: nameField.getValue(),
      playerName: player,
      description,
      size,
      stats: {
        might: stats.might,
        insight: stats.insight,
        shell: stats.shell,
        grace: stats.grace,
        heart: stats.heart,
        stamina: stats.stamina,
        soul: stats.soul,
        speed: stats.speed,
        cute: stats.cute,
        spook: stats.spook,
      }
    });
    onNextPressed();
  };

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
            disabled={value === baseValue}
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

  const sizeButtonClick = (value: BugSize) => {
    setSize(size === value ? undefined : value);
  };

  const sizeButton = (value: BugSize, label: string) => {
    return (
      <Button
        leftSection={size === value ? <FaCheck /> : <></>}
        variant={size === value ? "light" : "default"}
        onClick={() => sizeButtonClick(value)}
      >
        {label}
      </Button>
    );
  };

  const hungerRange: [number, number] = [stats.hungerStart, stats.hungerMax];

  return (
    <>
      <div style={{ display: "flex", columnGap: 16 }}>
        <TextInput
          withAsterisk
          style={{ flexGrow: 1 }}
          label="Character name"
          {...nameField.getInputProps()}
        />

        <TextInput
          style={{ flexGrow: 1 }}
          label="Player name"
          value={player}
          onChange={(event) => setPlayer(event.target.value)}
        />
      </div>

      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      />

      <Title order={3} style={{ marginTop: 24, marginBottom: 12 }}>
        Bug Size
        <Text span inherit c="red">
          *
        </Text>
      </Title>

      <Group>
        {sizeButton("small", "Small")}
        {sizeButton("medium", "Medium")}
        {sizeButton("large", "Large")}

        {!size && <Text c="red">Choose a size for your bug</Text>}
      </Group>

      <div style={{ display: "flex", marginTop: 16 }}>
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
                <Text span inherit c="red">
                  *
                </Text>
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
      </div>

      <Group justify="space-between" mt="xl">
        <Button variant="default" onClick={back}>
          Back
        </Button>
        <Button disabled={!!nameField.error || !size || bonusCuteSpook > 0} onClick={next}>Next</Button>
      </Group>
    </>
  );
}
