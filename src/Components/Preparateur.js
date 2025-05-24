import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const GestionCommandes = () => {
  const [commandesParClient, setCommandesParClient] = useState({});
  const [selectedCommande, setSelectedCommande] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/commandes') // Endpoint mis à jour pour récupérer toutes les commandes
      .then(res => {
        const commandes = res.data;
        const groupées = {};
        commandes.forEach(c => {
          const nom = c.client?.nom ?? "Inconnu";
          if (!groupées[nom]) groupées[nom] = [];
          groupées[nom].push(c);
        });
        setCommandesParClient(groupées);
      })
      .catch(err => console.error(err));
  }, []);

  const changerStatut = (id, nouveauStatut) => {
    axios.put(`http://localhost:8080/commandes/${id}/statut`, { statut: nouveauStatut })
      .then(() => {
        // Met à jour localement les données pour éviter une nouvelle requête
        setCommandesParClient(prev => {
          const updated = { ...prev };
          for (const client in updated) {
            updated[client] = updated[client].map(cmd =>
              cmd.id === id ? { ...cmd, statut: nouveauStatut } : cmd
            );
          }
          return updated;
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4 space-y-6">
      {Object.entries(commandesParClient).map(([clientNom, commandes]) => (
        <Card key={clientNom}>
          <CardHeader>
            <CardTitle>Client : {clientNom}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {commandes.map(cmd => (
              <div key={cmd.id} className="flex justify-between items-center border p-2 rounded">
                <div>
                  <p><strong>Date :</strong> {new Date(cmd.dateCommande).toLocaleString()}</p>
                  <p><strong>Statut :</strong> {cmd.statut}</p>
                </div>
                <div className="flex gap-2">
                  {cmd.statut === 'Commandé' && (
                    <Button onClick={() => changerStatut(cmd.id, 'En préparation')}>Traiter</Button>
                  )}
                  {cmd.statut === 'En préparation' && (
                    <Button onClick={() => changerStatut(cmd.id, 'Terminé')}>Terminer</Button>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary" onClick={() => setSelectedCommande(cmd)}>Détails</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Détails de la commande #{cmd.id}</DialogTitle>
                      </DialogHeader>
                      <div>
                        {cmd.lignesCommande.map(lc => (
                          <div key={lc.id} className="mb-2">
                            <p><strong>Produit :</strong> {lc.produit.libelle}</p>
                            <p><strong>Quantité :</strong> {lc.quantite}</p>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GestionCommandes;
