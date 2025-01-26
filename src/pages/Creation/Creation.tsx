import { Button, Container, Group, Stepper } from "@mantine/core";
import { useState } from "react";
import GeneralInfo from "./GeneralInfo";
import { useNavigate } from "react-router-dom";
import TraitSelection from "./TraitSelection";
import { CharacterSheet } from "@types";
import { createBlankSheet } from "@utils/sheet";
import { useDispatch } from "react-redux";
import { addSheet } from "@store/library";
import { useDisclosure } from "@mantine/hooks";
import { Dialog } from "@components";

export default function Creation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sheet, setSheet] = useState<CharacterSheet>(() => createBlankSheet());
  const [opened, { open, close }] = useDisclosure(false);
  const goBack = (option: boolean) => {
    close();
    if (option) {
      navigate("../");
    }
  };

  const [active, setActive] = useState<number>(0);
  const stepCount = 3;
  const nextStep = () =>
    setActive((current: number) =>
      current < stepCount - 1 ? current + 1 : current,
    );
  const prevStep = () => {
    if (active === 0) {
      open();
    } else {
      setActive((current: number) => (current > 0 ? current - 1 : current));
    }
  };

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

      <Dialog
        opened={opened}
        title="Go back to library?"
        message="You will loose all this sheet's unsaved data."
        onSubmit={goBack}
        confirmMessage="Leave without saving"
        cancelMessage="Stay"
      ></Dialog>
    </Container>
  );
}
