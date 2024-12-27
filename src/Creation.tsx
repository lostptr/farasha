import { Button, Container, Group, Stepper } from "@mantine/core";
import { useState } from "react";

export default function Creation() {
  const [active, setActive] = useState<number>(0);
  const stepCount = 3;
  const nextStep = () =>
    setActive((current: number) =>
      current < stepCount - 1 ? current + 1 : current,
    );
  const prevStep = () =>
    setActive((current: number) => (current > 0 ? current - 1 : current));

  const finish = () => {};

  return (
    <Container p="md">
      <Stepper active={active}>
        <Stepper.Step label="General Info">General Info</Stepper.Step>
        <Stepper.Step label="Traits">Choose your traits</Stepper.Step>
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
