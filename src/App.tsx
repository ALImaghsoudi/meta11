import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DemoApp() {
  const [selectedLand, setSelectedLand] = useState<number | null>(null);
  const [owners, setOwners] = useState<Record<number, string>>({});

  const handleMintLand = () => {
    if (selectedLand !== null && !owners[selectedLand]) {
      setOwners({ ...owners, [selectedLand]: "You" });
      alert(`Land #${selectedLand + 1} minted!`);
    } else {
      alert("Please select an unowned land block.");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">MetaEstate MVP</h1>
      <Tabs defaultValue="map">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="launchpad">Launch Meme Token</TabsTrigger>
          <TabsTrigger value="nft">NFT Rewards</TabsTrigger>
          <TabsTrigger value="swap">Token Swap</TabsTrigger>
        </TabsList>

        <TabsContent value="map">
          <Card className="mt-4">
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">Virtual Land Ownership</h2>
              <p>Select an available land block and mint as NFT. Later you can upgrade it with buildings.</p>
              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: 100 }).map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedLand(idx)}
                    className={`h-10 text-center text-xs flex items-center justify-center cursor-pointer border 
                      ${owners[idx] ? "bg-gray-300" : selectedLand === idx ? "bg-blue-400" : "bg-green-200"}`}
                  >
                    {owners[idx] ? `Owned` : `Land #${idx + 1}`}
                  </div>
                ))}
              </div>
              <Button className="mt-4" onClick={handleMintLand}>Mint Selected Land</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="launchpad">
          <Card className="mt-4">
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">Create a Meme Token</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Token Name</Label><Input placeholder="e.g. TurboShiba" /></div>
                <div><Label>Symbol</Label><Input placeholder="e.g. TSHIBA" /></div>
                <div><Label>Total Supply</Label><Input type="number" placeholder="e.g. 1000000000" /></div>
              </div>
              <Button>Create Token</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nft">
          <Card className="mt-4">
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">Official Meme NFTs</h2>
              <p>Claim your exclusive NFT after creating or voting on Meme tokens.</p>
              <div className="grid grid-cols-3 gap-4">
                {["Restaurant", "Hotel", "Airport"].map((type, id) => (
                  <Card key={id}>
                    <CardContent className="p-2">
                      <img src={`https://via.placeholder.com/300x300?text=${type}`} alt={`NFT ${type}`} className="w-full rounded-xl" />
                      <p className="mt-2 text-center font-medium">{type} NFT</p>
                      <Button className="w-full mt-2">Mint {type}</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="swap">
          <Card className="mt-4">
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">Swap Your Tokens</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>From</Label><Input placeholder="e.g. ASTR" /></div>
                <div><Label>To</Label><Input placeholder="e.g. TSHIBA" /></div>
              </div>
              <Button>Swap</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}