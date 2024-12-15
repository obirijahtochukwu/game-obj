import React from "react";

export default function filterTableLabelsByCondition(
  data: string[],
  is_exist: string,
  label: string,
  setFilterLabels: React.Dispatch<string[]>
) {
  const labels = data.filter((e) => e != is_exist);
  setFilterLabels([...labels, label]);
}
