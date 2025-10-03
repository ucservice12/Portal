"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TypographyH5 } from "@/components/custom/Typography";
import { IoSearch } from "react-icons/io5";

export default function TaskFilterPanel({
  searchValue,
  onSearchChange,
  assignees = [],
  selectedAssignees = [],
  onToggleAssignee,
  statuses = [],
  selectedStatuses = [],
  onToggleStatus,
  priorities = [],
  selectedPriorities = [],
  onTogglePriority,
  delayedStatus = "",
  onChangeDelayedStatus,
  filterBy = "",
  onChangeFilterBy,
}) {
  return (
    <div className="border rounded-md p-4 space-y-4 w-full">
      <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-4 items-start">
        {/*  Search */}
        <div className="flex items-center gap-2 border dark:border-foreground rounded-md px-3">
          <IoSearch className="text-muted-foreground" />
          <Input
            placeholder="Search Tasks"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-0 focus-visible:ring-0 shadow-none focus-visible:ring-offset-0 p-0"
          />
        </div>

        {/*  Assignee */}
        <div>
          <TypographyH5 className="mb-2 font-medium">
            Select Assigned To
          </TypographyH5>
          <div className="space-y-2">
            {assignees.map((name) => (
              <div key={name} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedAssignees.includes(name)}
                  onCheckedChange={() => onToggleAssignee(name)}
                  id={`assignee-${name}`}
                />
                <span className="text-sm text-accent-foreground">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/*  Status */}
        <div>
          <TypographyH5 className="mb-2 font-medium">
            Select Tasks Status
          </TypographyH5>
          <div className="space-y-2">
            {statuses.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedStatuses.includes(status)}
                  onCheckedChange={() => onToggleStatus(status)}
                  id={`status-${status}`}
                />
                <span className="text-sm">{status}</span>
              </div>
            ))}
          </div>
        </div>

        {/*  Priority */}
        <div>
          <TypographyH5 className="mb-2 font-medium">
            Select Tasks Priority
          </TypographyH5>
          <div className="space-y-2">
            {priorities.map((priority) => (
              <div key={priority} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedPriorities.includes(priority)}
                  onCheckedChange={() => onTogglePriority(priority)}
                  id={`priority-${priority}`}
                />
                <span className="capitalize text-sm">{priority}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delayed / On Time */}
        <div>
          <TypographyH5 className="mb-2 font-medium">
            Filter Tasks By Delayed/On Time
          </TypographyH5>
          <RadioGroup
            value={delayedStatus}
            onValueChange={onChangeDelayedStatus}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Delayed" id="delayed" />
              <span className="text-sm">Delayed</span>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="On Time" id="ontime" />
              <span className="text-sm">On Time</span>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Filter Mode */}
      <div>
        <TypographyH5 className="mb-2 font-medium">Filter Tasks</TypographyH5>
        <RadioGroup
          value={filterBy}
          onValueChange={onChangeFilterBy}
          className="space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Active Sprint" id="sprint" />
            <span className="text-sm">By Active Sprint</span>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Tasks" id="tasks" />
            <span className="text-sm">Tasks</span>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
