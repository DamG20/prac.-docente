/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  RotateCcw,
  Play,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CTS_QUESTIONS } from './questions';
import { Team, GameState } from './types';

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    scoreA: 0,
    scoreB: 0,
    currentQuestionIndex: 0,
    currentTurn: 'A',
    phase: 'setup',
  });

  const [teamNames, setTeamNames] = useState({ A: 'Equipo A', B: 'Equipo B' });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = CTS_QUESTIONS[gameState.currentQuestionIndex];

  const handleStartGame = () => {
    setGameState(prev => ({ ...prev, phase: 'playing' }));
  };

  const handleAnswer = (optionId: string) => {
    if (gameState.phase !== 'playing') return;
    
    const option = currentQuestion.options.find(o => o.id === optionId);
    if (!option) return;

    setSelectedOption(optionId);
    
    const isCorrect = option.isCorrect;
    const team = gameState.currentTurn;

    setGameState(prev => ({
      ...prev,
      phase: 'feedback',
      scoreA: isCorrect && team === 'A' ? prev.scoreA + 1 : team === 'B' && !isCorrect ? prev.scoreA + 0.5 : prev.scoreA,
      scoreB: isCorrect && team === 'B' ? prev.scoreB + 1 : team === 'A' && !isCorrect ? prev.scoreB + 0.5 : prev.scoreB,
      lastAnswerResult: {
        isCorrect,
        explanation: option.explanation,
        team
      }
    }));

    if (isCorrect) {
      // Trigger a small confetti burst for the pull
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { x: team === 'A' ? 0.2 : 0.8, y: 0.5 },
        colors: team === 'A' ? ['#06b6d4', '#22d3ee'] : ['#ef4444', '#f87171']
      });
    }
  };

  const nextQuestion = () => {
    const nextIndex = gameState.currentQuestionIndex + 1;
    if (nextIndex < CTS_QUESTIONS.length) {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex,
        currentTurn: prev.currentTurn === 'A' ? 'B' : 'A',
        phase: 'playing',
        lastAnswerResult: undefined,
      }));
      setSelectedOption(null);
    } else {
      setGameState(prev => ({ ...prev, phase: 'finished' }));
      
      // Final winner confetti
      const winner = gameState.scoreA > gameState.scoreB ? 'A' : gameState.scoreB > gameState.scoreA ? 'B' : 'Draw';
      if (winner !== 'Draw') {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const resetGame = () => {
    setGameState({
      scoreA: 0,
      scoreB: 0,
      currentQuestionIndex: 0,
      currentTurn: 'A',
      phase: 'setup',
    });
    setSelectedOption(null);
  };

  // Derived Values
  const knotPosition = (gameState.scoreB - gameState.scoreA) * 60; // 60px per point difference
  const maxPull = 150;
  const clampedKnotPosition = Math.max(-maxPull, Math.min(maxPull, knotPosition));

  return (
    <div className="min-h-screen bg-transparent font-sans text-white overflow-x-hidden relative">
      <div className="atmosphere" />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/5 backdrop-blur-xl border-b border-white/10 z-50 px-8 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-0.5">Reto Educativo CTS</span>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
            Duelo de <span className="team-cyan-text italic">Conocimiento</span>
          </h1>
        </div>
        
        {gameState.phase !== 'setup' && (
          <div className="glass-card px-6 py-2 flex items-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase font-black text-white/30 tracking-widest">Ronda</span>
              <div className="text-lg font-mono font-bold text-white">
                {gameState.currentQuestionIndex + 1} / {CTS_QUESTIONS.length}
              </div>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <button 
              onClick={resetGame}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
              title="Reiniciar Juego"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        )}
      </header>

      <main className="relative z-10 pt-32 pb-12 px-6 max-w-5xl mx-auto min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* SETUP PHASE */}
          {gameState.phase === 'setup' && (
            <motion.div 
              key="setup"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-12 space-y-12 flex-1 flex flex-col justify-center"
            >
              <div className="text-center space-y-4">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-2"
                >
                  Innovación Pedagógica
                </motion.span>
                <h2 className="text-6xl font-black text-white tracking-tighter leading-[0.9]">
                  TIRA <span className="text-white/20">&</span> AFLOJA <br/>
                  <span className="team-cyan-text italic">CIENCIA Y SOCIEDAD</span>
                </h2>
                <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
                  Competencia grupal interactiva para fortalecer competencias CTS. Jalad la cuerda hacia vuestro campo respondiendo correctamente.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
                <div className="glass-card p-8 space-y-6 group transition-all hover:bg-white/5 hover:border-cyan-500/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="font-black uppercase tracking-widest text-[10px] text-cyan-400/60">Equipo Izquierda</h3>
                      <div className="text-xl font-bold team-cyan-text uppercase italic">Alfa</div>
                    </div>
                  </div>
                  <input 
                    type="text"
                    value={teamNames.A}
                    onChange={(e) => setTeamNames(prev => ({ ...prev, A: e.target.value }))}
                    className="w-full bg-white/5 text-xl font-bold p-4 rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder:text-white/10"
                    placeholder="Nombre del Equipo A"
                  />
                </div>

                <div className="glass-card p-8 space-y-6 group transition-all hover:bg-white/5 hover:border-pink-500/30">
                  <div className="flex items-center gap-4 justify-end text-right">
                    <div>
                      <h3 className="font-black uppercase tracking-widest text-[10px] text-pink-400/60">Equipo Derecha</h3>
                      <div className="text-xl font-bold team-pink-text uppercase italic">Omega</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                      <Users size={24} />
                    </div>
                  </div>
                  <input 
                    type="text"
                    value={teamNames.B}
                    onChange={(e) => setTeamNames(prev => ({ ...prev, B: e.target.value }))}
                    className="w-full bg-white/5 text-xl font-bold p-4 rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all placeholder:text-white/10 text-right"
                    placeholder="Nombre del Equipo B"
                  />
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <button 
                  onClick={handleStartGame}
                  className="group relative flex items-center gap-4 bg-white text-stone-950 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                >
                  INICIAR DUELO
                  <Play size={24} className="fill-current" />
                  <div className="absolute inset-0 rounded-2xl bg-white animate-ping opacity-10 group-hover:opacity-20 transition-all pointer-events-none" />
                </button>
              </div>
            </motion.div>
          )}

          {/* PLAYING PHASE */}
          {(gameState.phase === 'playing' || gameState.phase === 'feedback') && (
            <motion.div 
              key="gameplay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <section className="space-y-8">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col items-start">
                    <div className="team-cyan-text text-4xl font-black italic uppercase tracking-tighter">{teamNames.A}</div>
                    <div className="text-[10px] opacity-40 mt-1 uppercase font-black tracking-widest">Puntos de Resistencia: {Math.round(gameState.scoreA * 10)}</div>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <div className="team-pink-text text-4xl font-black italic uppercase tracking-tighter">{teamNames.B}</div>
                    <div className="text-[10px] opacity-40 mt-1 uppercase font-black tracking-widest">Puntos de Resistencia: {Math.round(gameState.scoreB * 10)}</div>
                  </div>
                </div>

                <div className="relative px-4">
                  <div className="rope-track" />
                  
                  {/* Central marker from design */}
                  <div className="absolute top-1/2 left-1/2 h-14 w-[1px] bg-white/20 -translate-y-1/2" />
                  
                  <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10"
                    animate={{ x: clampedKnotPosition }}
                    transition={{ type: 'spring', stiffness: 100, damping: 12 }}
                  >
                    <div className="w-14 h-14 glass-card bg-white rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center border-4 border-[#05070a]">
                      <svg className="w-8 h-8 text-stone-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7l4 4m0 0l4-4m-4 4v8" />
                      </svg>
                      <div className="absolute top-[-30px] w-[2px] h-[120px] bg-white/60 blur-[1px]" />
                    </div>
                  </motion.div>
                  
                  <div className="absolute -top-6 left-0 team-cyan-text text-[9px] font-black uppercase tracking-[0.2em] opacity-50">Zona Victoria Alfa</div>
                  <div className="absolute -top-6 right-0 team-pink-text text-[9px] font-black uppercase tracking-[0.2em] opacity-50">Zona Victoria Omega</div>
                </div>
              </section>

              {/* CURRENT TURN INDICATOR */}
              {gameState.phase === 'playing' && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`p-5 glass-card text-center font-black text-sm tracking-[0.3em] uppercase border-2 flex items-center justify-center gap-4 ${
                    gameState.currentTurn === 'A' 
                      ? 'border-cyan-500/30 text-cyan-400' 
                      : 'border-pink-500/30 text-pink-400'
                  }`}
                >
                  <ArrowRight size={18} className={gameState.currentTurn === 'B' ? 'rotate-180' : ''} />
                  ACCIÓN: {gameState.currentTurn === 'A' ? teamNames.A : teamNames.B}
                  <ArrowRight size={18} className={gameState.currentTurn === 'B' ? 'rotate-180' : ''} />
                </motion.div>
              )}

              {/* QUESTION AREA */}
              <div className="space-y-8 flex-1 flex flex-col">
                <motion.div 
                  layout
                  className="glass-card p-10 text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500/50" />
                  <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Situación de Análisis</span>
                  <h3 className="text-2xl font-medium leading-tight text-white/90 italic mb-8 mx-auto max-w-3xl">
                    "{currentQuestion.situation}"
                  </h3>
                  <div className="h-px w-20 bg-white/10 mx-auto mb-8" />
                  <h2 className="text-3xl font-black text-white leading-[1.1] tracking-tight">
                    {currentQuestion.question}
                  </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.id}
                      disabled={gameState.phase === 'feedback'}
                      onClick={() => handleAnswer(option.id)}
                      className={`answer-btn p-6 rounded-2xl flex items-center text-left transition-all gap-5 ${
                        selectedOption === option.id
                          ? option.isCorrect 
                            ? 'bg-green-500/20 border-green-500/50 scale-[1.02]'
                            : 'bg-red-500/20 border-red-500/50 scale-[1.02]'
                          : gameState.phase === 'feedback' && option.isCorrect
                            ? 'bg-green-500/10 border-green-500/30'
                            : 'hover:scale-[1.01]'
                      }`}
                    >
                      <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center font-black text-xl transition-colors ${
                        selectedOption === option.id ? 'bg-white text-stone-900' : 'bg-white/5 text-white/40'
                      }`}>
                        {option.id.toUpperCase()}
                      </div>
                      <span className="text-lg font-bold leading-snug">{option.text}</span>
                      
                      {gameState.phase === 'feedback' && (
                        <div className="ml-auto">
                          {option.isCorrect ? <CheckCircle2 className="text-green-500" /> : selectedOption === option.id ? <XCircle className="text-red-500" /> : null}
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* FEEDBACK SECTION */}
                {gameState.phase === 'feedback' && gameState.lastAnswerResult && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-8 glass-card border-l-8 ${
                      gameState.lastAnswerResult.isCorrect 
                        ? 'border-green-500/50' 
                        : 'border-red-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4 font-black uppercase text-[10px] tracking-[0.3em] opacity-40">
                      <HelpCircle size={16} />
                      Análisis de Resultado
                    </div>
                    <p className="text-xl font-medium leading-relaxed text-white/80">
                      {gameState.lastAnswerResult.explanation}
                    </p>
                    <div className="mt-8 flex justify-end">
                      <button 
                        onClick={nextQuestion}
                        className="flex items-center gap-3 bg-white text-stone-950 px-8 py-3 rounded-xl font-black text-sm hover:scale-105 active:scale-95 transition-transform shadow-xl"
                      >
                        PRÓXIMA RONDA
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* FINISHED PHASE */}
          {gameState.phase === 'finished' && (
            <motion.div 
              key="finished"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 space-y-12 flex-1 flex flex-col justify-center"
            >
              <div className="space-y-6">
                <motion.div 
                  animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 5 }}
                  className="w-32 h-32 glass-card bg-yellow-500/20 mx-auto flex items-center justify-center text-yellow-400 border-yellow-500/30 shadow-[0_0_50px_rgba(255,215,0,0.2)]"
                >
                  <Trophy size={64} />
                </motion.div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Competencia Finalizada</span>
                  <h2 className="text-7xl font-black tracking-tighter leading-[0.8] mb-4">¡DUELO <span className="team-cyan-text italic">COMPLETADO</span>!</h2>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto w-full">
                <div className={`p-10 glass-card border-2 transition-all ${gameState.scoreA > gameState.scoreB ? 'border-cyan-500 bg-cyan-500/10 scale-105 shadow-[0_0_50px_rgba(0,209,255,0.2)]' : 'border-white/5 opacity-30 shadow-none'}`}>
                  <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2">{teamNames.A}</div>
                  <div className="text-6xl font-black italic tracking-tighter">{Math.round(gameState.scoreA * 10)}</div>
                </div>
                <div className={`p-10 glass-card border-2 transition-all ${gameState.scoreB > gameState.scoreA ? 'border-pink-500 bg-pink-500/10 scale-105 shadow-[0_0_50px_rgba(255,0,229,0.2)]' : 'border-white/5 opacity-30 shadow-none'}`}>
                  <div className="text-[10px] font-black uppercase tracking-widest text-pink-400 mb-2">{teamNames.B}</div>
                  <div className="text-6xl font-black italic tracking-tighter">{Math.round(gameState.scoreB * 10)}</div>
                </div>
              </div>

              <div className="space-y-8 pt-8">
                {gameState.scoreA === gameState.scoreB ? (
                  <h3 className="text-4xl font-black text-white/40 tracking-tighter uppercase italic">¡EMPATE DE TITANES!</h3>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-xl font-black uppercase tracking-[0.3em] text-white/30 italic">Victoria Suprema</h3>
                    <h4 className={`text-7xl font-black uppercase tracking-tighter leading-none ${gameState.scoreA > gameState.scoreB ? 'team-cyan-text' : 'team-pink-text'}`}>
                      {gameState.scoreA > gameState.scoreB ? teamNames.A : teamNames.B}
                    </h4>
                  </div>
                )}
                
                <button 
                  onClick={resetGame}
                  className="inline-flex items-center gap-4 bg-white text-stone-950 px-12 py-6 rounded-2xl font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  VOLVER A RETAR
                  <RotateCcw size={28} />
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <footer className="relative z-10 py-12 flex justify-center gap-12 text-[10px] uppercase font-black tracking-[0.3em] text-white/20">
        <span>Interactivo CTS v2.0</span>
        <span className="text-white/5">•</span>
        <span>Colegio El Carito</span>
        <span className="text-white/5">•</span>
        <span>Modo Competitivo</span>
      </footer>
    </div>
  );
}

