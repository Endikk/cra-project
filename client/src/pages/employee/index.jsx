import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"; 
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label"; 

function EmployeeDashboardPage() {
  const [currentTask, setCurrentTask] = useState('');
  const [hoursSpent, setHoursSpent] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [timeEntries, setTimeEntries] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());

  const handleTimeSubmit = (e) => {
    e.preventDefault();
    if (!currentTask || !hoursSpent || !selectedDate) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    const newEntry = {
      id: Date.now(),
      date: selectedDate,
      task: currentTask,
      hours: parseFloat(hoursSpent),
    };
    setTimeEntries([newEntry, ...timeEntries]); 
    setCurrentTask('');
    setHoursSpent('');
    // setSelectedDate(new Date().toISOString().slice(0, 10)); 
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-10">Tableau de Bord Employé</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Section de saisie du temps - prend 2 colonnes sur lg */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl">Saisir les heures de travail</CardTitle>
            <CardDescription>Entrez les détails de la tâche et le temps passé.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTimeSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="date">Date :</Label>
                <Input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task">Tâche :</Label>
                <Input
                  type="text"
                  id="task"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                  placeholder="Description de la tâche"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Heures passées :</Label>
                <Input
                  type="number"
                  id="hours"
                  value={hoursSpent}
                  onChange={(e) => setHoursSpent(e.target.value)}
                  placeholder="Nombre d'heures (ex: 2.5)"
                  min="0.1"
                  step="0.1"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Enregistrer le temps
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Section Agenda/Calendrier - prend 1 colonne sur lg */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-2xl">Agenda</CardTitle>
            <CardDescription>Consultez votre planning.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={calendarDate}
              onSelect={setCalendarDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      {/* Section des saisies récentes */}
      {timeEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Saisies Récentes</CardTitle>
            <CardDescription>Vos dernières entrées de temps.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {timeEntries.map(entry => (
                <li key={entry.id} className="p-4 bg-muted/40 rounded-md shadow-sm flex justify-between items-center hover:bg-muted transition-colors">
                  <div>
                    <p className="font-medium text-foreground">Date: {new Date(entry.date + 'T00:00:00').toLocaleDateString()}</p> 
                    <p className="text-sm text-muted-foreground">Tâche: {entry.task}</p>
                  </div>
                  <p className="text-lg font-semibold text-primary">{entry.hours} hrs</p>
                </li>
              ))}
            </ul>
          </CardContent>
          {timeEntries.length > 5 && (
            <CardFooter className="text-sm text-muted-foreground">
              Affichage des {timeEntries.length} dernières saisies.
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  );
}

export default EmployeeDashboardPage;
