import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Brain, Users, Target, TrendingUp, Play, RotateCcw } from 'lucide-react';
import './App.css';

// Composant pour la simulation du dilemme du prisonnier
const PrisonersDilemmaSimulation = () => {
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);
  const [results, setResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const payoffMatrix = {
    'cooperate-cooperate': { p1: 3, p2: 3, desc: 'Coopération mutuelle' },
    'cooperate-defect': { p1: 0, p2: 5, desc: 'Joueur 1 coopère, Joueur 2 trahit' },
    'defect-cooperate': { p1: 5, p2: 0, desc: 'Joueur 1 trahit, Joueur 2 coopère' },
    'defect-defect': { p1: 1, p2: 1, desc: 'Trahison mutuelle (Équilibre de Nash)' }
  };

  const simulate = () => {
    if (!player1Choice || !player2Choice) return;
    
    setIsSimulating(true);
    setTimeout(() => {
      const key = `${player1Choice}-${player2Choice}`;
      setResults(payoffMatrix[key]);
      setIsSimulating(false);
    }, 1000);
  };

  const reset = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setResults(null);
    setIsSimulating(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl">
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Simulation du Dilemme du Prisonnier
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-700">Joueur 1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                variant={player1Choice === 'cooperate' ? 'default' : 'outline'}
                onClick={() => setPlayer1Choice('cooperate')}
                className="w-full"
              >
                Coopérer
              </Button>
              <Button
                variant={player1Choice === 'defect' ? 'destructive' : 'outline'}
                onClick={() => setPlayer1Choice('defect')}
                className="w-full"
              >
                Trahir
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Joueur 2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                variant={player2Choice === 'cooperate' ? 'default' : 'outline'}
                onClick={() => setPlayer2Choice('cooperate')}
                className="w-full"
              >
                Coopérer
              </Button>
              <Button
                variant={player2Choice === 'defect' ? 'destructive' : 'outline'}
                onClick={() => setPlayer2Choice('defect')}
                className="w-full"
              >
                Trahir
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center space-y-4">
        <div className="flex justify-center gap-4">
          <Button
            onClick={simulate}
            disabled={!player1Choice || !player2Choice || isSimulating}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Play className="w-4 h-4 mr-2" />
            {isSimulating ? 'Simulation...' : 'Simuler'}
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
        </div>

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h4 className="text-lg font-semibold mb-3">{results.desc}</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{results.p1}</div>
                <div className="text-sm text-gray-600">Points Joueur 1</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{results.p2}</div>
                <div className="text-sm text-gray-600">Points Joueur 2</div>
              </div>
            </div>
            {player1Choice === 'defect' && player2Choice === 'defect' && (
              <Badge className="mt-3 bg-red-100 text-red-800">
                Équilibre de Nash
              </Badge>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 opacity-90"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Brain className="w-20 h-20 mx-auto mb-6 text-blue-200" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Équilibre de Nash
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Découvrez les secrets de la théorie des jeux et comment les décisions rationnelles façonnent notre monde
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4"
                onClick={() => document.getElementById('definition').scrollIntoView({ behavior: 'smooth' })}
              >
                Explorer le concept
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Definition Section */}
      <section id="definition" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Qu'est-ce que l'Équilibre de Nash ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un concept révolutionnaire qui explique comment les individus prennent des décisions optimales 
              dans des situations d'interaction stratégique.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-700 flex items-center">
                    <Target className="w-8 h-8 mr-3" />
                    Définition
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    L'équilibre de Nash est une situation où <strong>chaque joueur</strong> adopte la stratégie 
                    qui maximise son gain, compte tenu des stratégies choisies par les autres joueurs.
                  </p>
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Caractéristiques clés :</h4>
                    <ul className="space-y-2 text-blue-700">
                      <li>• Aucun joueur ne peut améliorer son gain en changeant unilatéralement de stratégie</li>
                      <li>• Chaque joueur prévoit correctement les choix des autres</li>
                      <li>• État de "non-regret" pour tous les participants</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Exemple Simple</h3>
                <p className="text-gray-600 mb-4">
                  Imaginez deux restaurants qui choisissent leurs prix. Chacun veut maximiser ses profits 
                  en tenant compte du prix de son concurrent.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-green-100 p-3 rounded">
                    <div className="font-semibold text-green-800">Restaurant A</div>
                    <div className="text-sm text-green-600">Prix optimal</div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <div className="font-semibold text-blue-800">Restaurant B</div>
                    <div className="text-sm text-blue-600">Prix optimal</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prisoner's Dilemma Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Le Dilemme du Prisonnier</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              L'exemple le plus célèbre de l'équilibre de Nash, qui illustre comment la rationalité individuelle 
              peut mener à un résultat sous-optimal pour tous.
            </p>
          </motion.div>

          <PrisonersDilemmaSimulation />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Analyse du Dilemme</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-600 mb-3">Pourquoi "Trahir-Trahir" est un équilibre ?</h4>
                <p className="text-gray-700">
                  Si l'autre joueur trahit, il vaut mieux trahir aussi (1 point vs 0). 
                  Si l'autre coopère, il vaut encore mieux trahir (5 points vs 3). 
                  Donc trahir est toujours la meilleure stratégie !
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-3">Le paradoxe</h4>
                <p className="text-gray-700">
                  Bien que "Coopérer-Coopérer" donne un meilleur résultat global (6 points au total vs 2), 
                  ce n'est pas stable car chaque joueur a intérêt à dévier vers la trahison.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Applications dans la Vie Réelle</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              L'équilibre de Nash s'applique dans de nombreux domaines, de l'économie à la biologie.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Économie",
                description: "Concurrence entre entreprises, fixation des prix, stratégies de marché",
                examples: ["Guerre des prix", "Cartels", "Enchères"]
              },
              {
                icon: Users,
                title: "Sciences Sociales",
                description: "Négociations internationales, conflits, coopération sociale",
                examples: ["Traités", "Course aux armements", "Biens publics"]
              },
              {
                icon: Brain,
                title: "Biologie",
                description: "Évolution des espèces, comportements animaux, sélection naturelle",
                examples: ["Stratégies de reproduction", "Territorialité", "Symbiose"]
              }
            ].map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <app.icon className="w-12 h-12 text-blue-600 mb-4" />
                    <CardTitle className="text-xl text-gray-800">{app.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {app.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3 text-gray-700">Exemples :</h4>
                    <ul className="space-y-2">
                      {app.examples.map((example, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">L'Héritage de John Nash</h2>
            <p className="text-xl mb-8 text-blue-100">
              L'équilibre de Nash a révolutionné notre compréhension des interactions stratégiques 
              et continue d'influencer la recherche en économie, politique et sciences sociales.
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <blockquote className="text-lg italic mb-4">
                "L'une des avancées intellectuelles les plus extraordinaires du XXe siècle"
              </blockquote>
              <p className="text-blue-200">Prix Nobel d'économie 1994</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2025 Équilibre de Nash - Théorie des Jeux Interactive</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
