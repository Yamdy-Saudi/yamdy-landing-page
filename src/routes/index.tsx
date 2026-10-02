import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/LandingPage";

// Public marketing page. Metadata and dedicated social artwork are set in __root.
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <LandingPage />;
}
