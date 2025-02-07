"use client";

import { useEffect, useState } from "react";
import { getFHIRClient, getPatient } from "@/lib/fhir-client";
import { Patient } from "@/types/fhir";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";


export default function DashboardPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const client = await getFHIRClient();
        const patientData = await getPatient(client);
        setPatient(patientData);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load patient data",
        });
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, [toast]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!patient) {
    return <div>No patient data found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>
                {patient.name?.[0]?.given?.[0]?.charAt(0)}
                {patient.name?.[0]?.family?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span>Patient Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Demographics</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {patient.name?.[0]?.given?.join(" ")}{" "}
                  {patient.name?.[0]?.family}
                </p>
                <p>
                  <span className="font-medium">Gender:</span> {patient.gender}
                </p>
                <p>
                  <span className="font-medium">Birth Date:</span>{" "}
                  {patient.birthDate}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {patient.address?.[0]?.line?.join(", ")}
                </p>
                <p>
                  <span className="font-medium">City:</span>{" "}
                  {patient.address?.[0]?.city}
                </p>
                <p>
                  <span className="font-medium">State:</span>{" "}
                  {patient.address?.[0]?.state}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {patient.telecom?.find((t) => t.system === "phone")?.value}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((section) => (
              <div key={section} className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <Skeleton key={item} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
