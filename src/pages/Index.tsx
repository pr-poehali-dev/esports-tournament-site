import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Team {
  id: string;
  name: string;
  logo: string;
  score?: number;
}

interface Match {
  id: string;
  team1: Team;
  team2: Team;
  status: 'live' | 'upcoming' | 'finished';
  round: string;
  time?: string;
}

interface Tournament {
  id: string;
  name: string;
  game: string;
  prize: string;
  status: 'live' | 'upcoming';
  participants: number;
  startDate: string;
}

const Index = () => {
  const [matches, setMatches] = useState<Match[]>([
    {
      id: '1',
      team1: { id: 't7', name: '2Play', logo: '🎯' },
      team2: { id: 't8', name: 'R4ZE', logo: '⚔️' },
      status: 'upcoming',
      round: 'Групповой этап',
      time: 'Завтра 19:30'
    },
    {
      id: '2',
      team1: { id: 't9', name: 'Yoko Team', logo: '🐉' },
      team2: { id: 't10', name: 'Sokratis2018', logo: '🛡️' },
      status: 'upcoming',
      round: 'Групповой этап',
      time: 'Завтра 19:30'
    },
    {
      id: '3',
      team1: { id: 't11', name: 'Alma3ik', logo: '💎' },
      team2: { id: 't12', name: 'Speans Team', logo: '⚡' },
      status: 'upcoming',
      round: 'Групповой этап',
      time: 'Завтра 19:30'
    }
  ]);

  const [tournaments] = useState<Tournament[]>([
    {
      id: '1',
      name: 'MLT League 2 season',
      game: 'CS2',
      prize: '1,000,000₽',
      status: 'live',
      participants: 16,
      startDate: '11 ноября 2025'
    }
  ]);

  const [topTeams] = useState([
    { rank: 1, name: 'Sokratis2018', points: 3, matches: 1, wins: 1, losses: 0, diff: '+1', trend: 'up' },
    { rank: 2, name: 'Yoko Team', points: 3, matches: 1, wins: 1, losses: 0, diff: '+1', trend: 'up' },
    { rank: 3, name: '2Play', points: 3, matches: 1, wins: 1, losses: 0, diff: '+1', trend: 'up' },
    { rank: 4, name: 'R4ZE', points: 3, matches: 1, wins: 1, losses: 0, diff: '+1', trend: 'up' },
    { rank: 5, name: 'Pulse Esports', points: 0, matches: 1, wins: 0, losses: 1, diff: '-1', trend: 'down' },
    { rank: 6, name: 'Speans Team', points: 0, matches: 1, wins: 0, losses: 1, diff: '-1', trend: 'down' },
    { rank: 7, name: 'Alma3ik', points: 0, matches: 1, wins: 0, losses: 1, diff: '-1', trend: 'down' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(prev => prev.map(match => {
        if (match.status === 'live' && match.time) {
          const [min, sec] = match.time.split(':').map(Number);
          const newSec = sec + 1;
          const newMin = newSec >= 60 ? min + 1 : min;
          return {
            ...match,
            time: `${newMin}:${(newSec % 60).toString().padStart(2, '0')}`
          };
        }
        return match;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/50d4a1de-196d-4750-8db8-d4729c62bceb.png" 
                alt="MLT League Logo" 
                className="h-12 w-auto"
              />
              <h1 className="text-2xl font-bold neon-glow">MLT League</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {['Турниры', 'Рейтинги', 'Команды', 'Расписание', 'Новости', 'Трансляции'].map(item => (
                <button key={item} className="text-sm hover:text-primary transition-colors">
                  {item}
                </button>
              ))}
            </nav>
            <Button className="bg-primary hover:bg-primary/90 neon-border">
              <Icon name="UserPlus" size={16} className="mr-2" />
              Регистрация
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 animate-fade-in">
          <div className="relative rounded-2xl overflow-hidden p-12 bg-gradient-to-br from-card via-muted to-card border border-primary/20">
            <div className="relative z-10">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/50">
                <span className="live-pulse mr-2">●</span> LIVE ТУРНИРЫ
              </Badge>
              <h2 className="text-5xl font-bold mb-4 neon-glow">
                Киберспортивные<br />Турниры 2025
              </h2>
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
                Следите за матчами в реальном времени, анализируйте статистику и болейте за любимые команды
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 neon-border">
                  <Icon name="Play" size={20} className="mr-2" />
                  Смотреть трансляции
                </Button>
                <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                  Расписание матчей
                </Button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <div className="text-[200px] transform rotate-12">🏆</div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold flex items-center gap-3">
              <span className="live-pulse text-primary">●</span>
              Live Матчи
            </h3>
            <Button variant="ghost" className="text-primary">
              Все матчи
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
          
          <div className="grid gap-4">
            {matches.map((match) => (
              <Card 
                key={match.id} 
                className={`
                  border-2 transition-all hover:scale-[1.02] cursor-pointer
                  ${match.status === 'live' ? 'border-primary/50 neon-border bg-card/80' : 'border-border'}
                `}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        {match.status === 'live' && (
                          <Badge className="bg-primary text-primary-foreground">
                            <span className="live-pulse mr-1">●</span> LIVE
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">{match.round}</span>
                        {match.time && <span className="text-sm font-mono text-primary">{match.time}</span>}
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-3xl">{match.team1.logo}</span>
                            <span className="text-lg font-semibold">{match.team1.name}</span>
                          </div>
                          {match.team1.score !== undefined && (
                            <span className="text-3xl font-bold text-primary">{match.team1.score}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-3xl">{match.team2.logo}</span>
                            <span className="text-lg font-semibold">{match.team2.name}</span>
                          </div>
                          {match.team2.score !== undefined && (
                            <span className="text-3xl font-bold text-primary">{match.team2.score}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {match.status === 'live' && (
                      <Button className="ml-6 bg-primary hover:bg-primary/90">
                        <Icon name="Tv" size={20} className="mr-2" />
                        Смотреть
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-6">Активные турниры</h3>
            <div className="space-y-4">
              {tournaments.map((tournament) => (
                <Card key={tournament.id} className="border-border hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{tournament.name}</CardTitle>
                          {tournament.status === 'live' && (
                            <Badge className="bg-primary/20 text-primary border-primary/50">
                              <span className="live-pulse mr-1">●</span> LIVE
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Gamepad2" size={16} />
                            {tournament.game}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Users" size={16} />
                            {tournament.participants} команд
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Calendar" size={16} />
                            {tournament.startDate}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-secondary neon-border-magenta px-4 py-2 rounded-lg bg-secondary/10">
                          {tournament.prize}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full border-primary/50 hover:bg-primary/10">
                      Турнирная сетка
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-6">Топ команд</h3>
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-2 text-sm font-semibold">#</th>
                        <th className="text-left p-2 text-sm font-semibold">Команда</th>
                        <th className="text-center p-2 text-sm font-semibold">Матчи</th>
                        <th className="text-center p-2 text-sm font-semibold">Победа</th>
                        <th className="text-center p-2 text-sm font-semibold">Проигрыш</th>
                        <th className="text-center p-2 text-sm font-semibold">+/-</th>
                        <th className="text-center p-2 text-sm font-semibold">Очки</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topTeams.map((team) => (
                        <tr 
                          key={team.rank}
                          className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                        >
                          <td className="p-3">
                            <div className={`
                              text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center
                              ${team.rank === 1 ? 'bg-primary/20 text-primary' : 
                                team.rank === 2 ? 'bg-secondary/20 text-secondary' : 
                                team.rank === 3 ? 'bg-accent/20 text-accent' : 'text-foreground'}
                            `}>
                              {team.rank}
                            </div>
                          </td>
                          <td className="p-3 font-semibold">{team.name}</td>
                          <td className="p-3 text-center">{team.matches}</td>
                          <td className="p-3 text-center">{team.wins}</td>
                          <td className="p-3 text-center">{team.losses}</td>
                          <td className={`p-3 text-center font-semibold ${team.diff.startsWith('+') ? 'text-primary' : 'text-destructive'}`}>
                            {team.diff}
                          </td>
                          <td className="p-3 text-center font-bold text-primary">{team.points} т</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-6 text-center">
                <Icon name="Trophy" size={48} className="mx-auto mb-4 text-primary" />
                <h4 className="text-xl font-bold mb-2">Стань чемпионом!</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Регистрируйся на турниры и выигрывай призы
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 neon-border">
                  Зарегистрироваться
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <section>
          <h3 className="text-3xl font-bold mb-6">Турнирная сетка - MLT League 2 season</h3>
          <Card className="border-primary/30">
            <CardContent className="p-8">
              <Tabs defaultValue="bracket" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="bracket">Сетка</TabsTrigger>
                  <TabsTrigger value="schedule">Расписание</TabsTrigger>
                  <TabsTrigger value="results">Результаты</TabsTrigger>
                </TabsList>
                
                <TabsContent value="bracket" className="space-y-8">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-primary/30">
                          <th className="text-left p-3 text-sm font-bold">#</th>
                          <th className="text-left p-3 text-sm font-bold">Команда</th>
                          <th className="text-center p-3 text-sm font-bold">Матчи</th>
                          <th className="text-center p-3 text-sm font-bold">Победа</th>
                          <th className="text-center p-3 text-sm font-bold">Проигрыш</th>
                          <th className="text-center p-3 text-sm font-bold">+/-</th>
                          <th className="text-center p-3 text-sm font-bold">Очки</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center bg-primary/20 text-primary">
                              1
                            </div>
                          </td>
                          <td className="p-3 font-semibold">team_Sokratis2018</td>
                          <td className="p-3 text-center">1</td>
                          <td className="p-3 text-center">1</td>
                          <td className="p-3 text-center">0</td>
                          <td className="p-3 text-center font-semibold text-primary">+1</td>
                          <td className="p-3 text-center font-bold text-primary">3 т</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center bg-secondary/20 text-secondary">
                              2
                            </div>
                          </td>
                          <td className="p-3 font-semibold">Yoko Team</td>
                          <td className="p-3 text-center">1</td>
                          <td className="p-3 text-center">1</td>
                          <td className="p-3 text-center">0</td>
                          <td className="p-3 text-center font-semibold text-primary">+1</td>
                          <td className="p-3 text-center font-bold text-primary">3 т</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center bg-accent/20 text-accent">
                              3
                            </div>
                          </td>
                          <td className="p-3 font-semibold">2play</td>
                          <td className="p-3 text-center">1</td>
                          <td className="p-3 text-center">1</td>
                          <td className="p-3 text-center">0</td>
                          <td className="p-3 text-center font-semibold text-primary">+1</td>
                          <td className="p-3 text-center font-bold text-primary">3 т</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center text-foreground">
                              4
                            </div>
                          </td>
                          <td className="p-3 font-semibold">RAZE</td>
                          <td className="p-3 text-center">1</td>
                          <td className="p-3 text-center">1</td>
                          <td className="p-3 text-center">0</td>
                          <td className="p-3 text-center font-semibold text-primary">+1</td>
                          <td className="p-3 text-center font-bold text-primary">3 т</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center text-foreground">
                              5
                            </div>
                          </td>
                          <td className="p-3 font-semibold">Pulse Esports</td>
                          <td className="p-3 text-center">1</td>
                          <td className="p-3 text-center">0</td>
                          <td className="p-3 text-center">1</td>
                          <td className="p-3 text-center font-semibold text-destructive">-1</td>
                          <td className="p-3 text-center font-bold text-primary">0 т</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center text-foreground">
                              6
                            </div>
                          </td>
                          <td className="p-3 font-semibold">Speans team</td>
                          <td className="p-3 text-center">1</td>
                          <td className="p-3 text-center">0</td>
                          <td className="p-3 text-center">1</td>
                          <td className="p-3 text-center font-semibold text-destructive">-1</td>
                          <td className="p-3 text-center font-bold text-primary">0 т</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center text-foreground">
                              7
                            </div>
                          </td>
                          <td className="p-3 font-semibold">team_Alma3ik</td>
                          <td className="p-3 text-center">1</td>
                          <td className="p-3 text-center">0</td>
                          <td className="p-3 text-center">1</td>
                          <td className="p-3 text-center font-semibold text-destructive">-1</td>
                          <td className="p-3 text-center font-bold text-primary">0 т</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="schedule">
                  <div className="text-center text-muted-foreground py-12">
                    <Icon name="Calendar" size={64} className="mx-auto mb-4 opacity-50" />
                    <p>Полное расписание матчей будет здесь</p>
                  </div>
                </TabsContent>

                <TabsContent value="results">
                  <div className="text-center text-muted-foreground py-12">
                    <Icon name="Trophy" size={64} className="mx-auto mb-4 opacity-50" />
                    <p>Результаты прошедших матчей</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border mt-16 py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Cyber Arena. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;