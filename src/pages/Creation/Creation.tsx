import { Button, Container, Group, Stepper } from "@mantine/core";
import { useState } from "react";
import GeneralInfo from "./GeneralInfo";
import { useNavigate } from "react-router-dom";
import TraitSelection from "./TraitSelection";
import { CharacterSheet } from "@types";
import { createBlankSheet } from "@utils/sheet";
import { useDispatch } from "react-redux";
import { addSheet } from "@store/library";

export default function Creation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sheet, setSheet] = useState<CharacterSheet>(() => createBlankSheet());

  const [active, setActive] = useState<number>(0);
  const stepCount = 3;
  const nextStep = () =>
    setActive((current: number) =>
      current < stepCount - 1 ? current + 1 : current,
    );
  const prevStep = () =>
    setActive((current: number) => (current > 0 ? current - 1 : current));

  const finish = () => {
    dispatch(addSheet(sheet));
    navigate("../");
  };


  return (
    <Container p="md">
      <Stepper active={active}>
        <Stepper.Step label="General Info">
          <GeneralInfo sheet={sheet} setSheet={setSheet} />
        </Stepper.Step>
        <Stepper.Step label="Traits">
          <TraitSelection sheet={sheet} setSheet={setSheet} />
        </Stepper.Step>
        <Stepper.Step label="Path">Choose thy path</Stepper.Step>
      </Stepper>

      <Group justify="space-between" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        {active < stepCount - 1 && <Button onClick={nextStep}>Next</Button>}
        {active >= stepCount - 1 && <Button onClick={finish}>Finish</Button>}
      </Group>
    </Container>
  );
}
