"use client";

import { useEffect } from "react";
import { initializeFHIR } from "@/lib/fhir-client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LaunchPage() {
  useEffect(() => {
    const launch = async () => {
      try {
        await initializeFHIR();
      } catch (error) {
        console.error("Launch Error:", error);
      }
    };

    launch();
  }, []);

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">Launching SMART App</h2>
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
