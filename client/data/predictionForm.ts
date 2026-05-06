import type { FormData } from "../types/prediction";

export const fieldConfig: Array<{
  key: keyof FormData;
  label: string;
  description: string;
  step?: string;
}> = [
  { key: "Type", label: "Machine Type", description: "Encoded product family identifier." },
  {
    key: "Air_temperature_K",
    label: "Air Temperature",
    description: "Ambient operating temperature in Kelvin.",
    step: "0.1",
  },
  {
    key: "Process_temperature_K",
    label: "Process Temperature",
    description: "Process temperature in Kelvin.",
    step: "0.1",
  },
  {
    key: "Rotational_speed_rpm",
    label: "Rotational Speed",
    description: "Machine spindle speed in RPM.",
  },
  {
    key: "Torque_Nm",
    label: "Torque",
    description: "Mechanical load in Newton meters.",
    step: "0.1",
  },
  {
    key: "Tool_wear_min",
    label: "Tool Wear",
    description: "Accumulated wear exposure in minutes.",
  },
  { key: "TWF", label: "TWF Flag", description: "Tool wear failure indicator." },
  { key: "HDF", label: "HDF Flag", description: "Heat dissipation failure indicator." },
  { key: "PWF", label: "PWF Flag", description: "Power failure indicator." },
  { key: "OSF", label: "OSF Flag", description: "Overstrain failure indicator." },
  { key: "RNF", label: "RNF Flag", description: "Random failure indicator." },
];

export const defaultFormData: FormData = {
  Type: 1,
  Air_temperature_K: 298,
  Process_temperature_K: 308,
  Rotational_speed_rpm: 1500,
  Torque_Nm: 40,
  Tool_wear_min: 0,
  TWF: 0,
  HDF: 0,
  PWF: 0,
  OSF: 0,
  RNF: 0,
};
