"use client";

import styled, { css } from "styled-components";

import { theme } from "@shared/styles";
import type {
  PhoneColorOption,
  PhoneStorageOption,
} from "../types/phone-detail.types";

const Root = styled.section`
  display: grid;
  gap: 2rem;
`;

const Group = styled.section`
  display: grid;
  gap: 0;
`;

const Label = styled.h2`
  font-size: ${theme.fontSize.sm};
  letter-spacing: 0;
  line-height: 100%;
  margin: 0 0 1.25rem;
  text-transform: uppercase;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0;
  padding: 0;
`;

const StorageRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  margin: 0;
  padding: 0;
`;

const ColorName = styled.div`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.sm};
  letter-spacing: 0;
  line-height: 100%;
  margin-top: 0.5rem;
  min-height: 1.2em;
  text-align: left;
`;

const OptionButton = styled.button<{ $active: boolean }>`
  align-items: center;
  background: ${theme.colors.bg};
  border: 1px solid
    ${({ $active }) => ($active ? theme.colors.primary : "#CCCCCC")};
  color: ${theme.colors.primary};
  cursor: pointer;
  display: flex;
  font-size: ${theme.fontSize.sm};
  height: 3rem;
  justify-content: center;
  letter-spacing: 0;
  line-height: 100%;
  margin-left: -1px;
  padding: 0;
  position: relative;
  text-transform: uppercase;
  transition: all 0.2s ease;
  width: 5.5625rem;
  z-index: ${({ $active }) => ($active ? 1 : 0)};

  ${({ $active }) =>
    $active &&
    css`
      box-shadow: inset 0 0 0 1px ${theme.colors.primary};
    `}

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    background: ${theme.colors.card};
    ${({ $active }) => !$active && "border-color: #9ca3af; z-index: 1;"}
  }
`;

const ColorSwatchButton = styled.button<{ $color: string; $active: boolean }>`
  background: ${({ $color }) => $color};
  border: ${({ $active }) =>
    $active ? `2px solid ${theme.colors.primary}` : "1px solid #CCCCCC"};
  border-radius: 0;
  box-shadow: inset 0 0 0 1px ${theme.colors.bg};
  cursor: pointer;
  height: 1.5rem;
  opacity: 1;
  padding: 0;
  width: 1.5rem;

  &:hover {
    border-color: ${({ $active }) =>
      $active ? theme.colors.primary : "#9ca3af"};
  }
`;

function getSwatchColor(color: PhoneColorOption): string {
  const value = color.code.trim();

  if (value.startsWith("#")) {
    return value;
  }

  const byName: Record<string, string> = {
    black: "#000000",
    white: "#f8fafc",
    silver: "#c0c0c0",
    gray: "#6b7280",
    grey: "#6b7280",
    blue: "#2563eb",
    yellow: "#facc15",
    violet: "#7c3aed",
    purple: "#7c3aed",
    green: "#16a34a",
    red: "#dc2626",
    gold: "#eab308",
  };

  return byName[value.toLowerCase()] ?? "#000000";
}

type VariantPickerProps = {
  colorOptions: PhoneColorOption[];
  storageOptions: PhoneStorageOption[];
  selectedColorCode: string | null;
  selectedStorageCode: string | null;
  onSelectColor: (colorCode: string) => void;
  onSelectStorage: (storageCode: string) => void;
};

export function VariantPicker({
  colorOptions,
  storageOptions,
  selectedColorCode,
  selectedStorageCode,
  onSelectColor,
  onSelectStorage,
}: VariantPickerProps) {
  return (
    <Root>
      <Group>
        <Label>STORAGE ¿HOW MUCH SPACE DO YOU NEED?</Label>
        <StorageRow>
          {storageOptions.map((storage) => {
            const active = storage.code === selectedStorageCode;

            return (
              <OptionButton
                key={storage.code}
                $active={active}
                aria-pressed={active}
                onClick={() => onSelectStorage(storage.code)}
                type="button"
              >
                {storage.name}
              </OptionButton>
            );
          })}
        </StorageRow>
      </Group>

      <Group>
        <Label>COLOR. PICK YOUR FAVOURITE.</Label>
        <Row>
          {colorOptions.map((color) => {
            const active = color.code === selectedColorCode;

            return (
              <ColorSwatchButton
                key={color.code}
                $active={active}
                $color={getSwatchColor(color)}
                aria-label={`Select color ${color.name}`}
                aria-pressed={active}
                onClick={() => onSelectColor(color.code)}
                title={color.name}
                type="button"
              />
            );
          })}
        </Row>
        <ColorName>
          {selectedColorCode
            ? colorOptions.find((c) => c.code === selectedColorCode)?.name || ""
            : ""}
        </ColorName>
      </Group>
    </Root>
  );
}
