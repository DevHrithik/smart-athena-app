"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getFHIRClient } from "@/lib/fhir-client";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const client = await getFHIRClient();
        sessionStorage.setItem("fhirClient", JSON.stringify(client));
        router.push("/dashboard");
      } catch (error) {
        console.error("Callback Error:", error);
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">
              Processing Authentication
            </h2>
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
