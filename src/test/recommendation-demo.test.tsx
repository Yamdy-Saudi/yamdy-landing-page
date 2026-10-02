import { cleanup, fireEvent, render, screen, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RecommendationDemo } from "@/components/landing/RecommendationDemo";

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("matchMedia", () => ({ matches: false }));
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
describe("Recommendation approval contract", () => {
  it("publishes only after approval and identifies the outcome as simulated", async () => {
    render(<RecommendationDemo />);
    expect(screen.queryByText("Orders ↑", { exact: false })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Approve" }));
    expect(screen.getByText("Approved")).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });
    expect(screen.getByText(/Simulated outcome, not historical performance/)).toBeInTheDocument();
  });
  it("uses a manager-edited price and emits no personal information", () => {
    const events: unknown[] = [];
    const listener = (e: Event) => events.push((e as CustomEvent).detail);
    window.addEventListener("yamdy:analytics", listener);
    render(<RecommendationDemo />);
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.change(screen.getByLabelText("Your price (SAR)"), { target: { value: "37" } });
    fireEvent.click(screen.getByRole("button", { name: "Save & approve" }));
    expect(screen.getByText("SAR 37")).toBeInTheDocument();
    expect(events).toEqual([
      { event: "interactive_demo_started", properties: {} },
      { event: "interactive_demo_approved", properties: { scenario: "classic_burger" } },
    ]);
    window.removeEventListener("yamdy:analytics", listener);
  });
  it("ignores without publishing and resets the example", () => {
    render(<RecommendationDemo />);
    fireEvent.click(screen.getByRole("button", { name: "Ignore" }));
    expect(screen.getByText("You stay in control. Nothing is published.")).toBeInTheDocument();
    expect(screen.queryByText("Publishing")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.getByRole("button", { name: "Approve" })).toBeInTheDocument();
  });
});
