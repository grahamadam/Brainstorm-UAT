// App root — wires shell, screens, coach, celebration, tweaks.
const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "violet",
  "type": "grotesque",
  "density": "comfy",
  "gamification": "balanced",
  "layoutVariant": "hero",
  "celebrationVariant": "cinematic",
  "showCoachByDefault": false,
  "currentScreen": "home"
}/*EDITMODE-END*/;

const USER = { name:'Alex Rivera', role:'AE', team:'Enterprise · West' };

const App = () => {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const { Sidebar, Topbar } = window.BrShell;
  const { Coach } = window.BrCoach;
  const { HomeScreen } = window.BrHome;
  const { LessonScreen } = window.BrLesson;
  const { CheckScreen } = window.BrCheck;
  const { LevelUpCelebration } = window.BrCelebration;
  const { DashboardScreen, PathsScreen, AchievementsScreen, LeaderboardScreen, ContentScreen } = window.BrOther;
  const { CourseScreen } = window.BrCourse;
  const { InsightsScreen } = window.BrInsightsScreen;
  const { SettingsScreen } = window.BrSettings;
  const { StudioScreen } = window.BrStudio;

  const [screen, setScreen]       = useStateApp(tweaks.currentScreen || 'home');
  const [coachOpen, setCoachOpen] = useStateApp(!!tweaks.showCoachByDefault);
  const [celebOpen, setCelebOpen] = useStateApp(false);
  const [kcModuleId, setKcModuleId]         = useStateApp('M01');
  const [lessonModuleId, setLessonModuleId] = useStateApp('M01');
  const coachLocked = screen === 'check';
  // Force-close coach when entering an assessment so its content can't help
  useEffectApp(() => { if (coachLocked) setCoachOpen(false); }, [coachLocked]);

  // Apply theme/accent/type/density to <html>
  useEffectApp(() => {
    const root = document.documentElement;
    root.dataset.theme = tweaks.theme;
    root.dataset.accent = tweaks.accent;
    root.dataset.type = tweaks.type;
    root.dataset.density = tweaks.density;
  }, [tweaks.theme, tweaks.accent, tweaks.type, tweaks.density]);

  useEffectApp(() => { if (tweaks.currentScreen && tweaks.currentScreen !== screen) setScreen(tweaks.currentScreen); }, [tweaks.currentScreen]);

  const onScreenChange = (id) => { setScreen(id); setTweak('currentScreen', id); };
  const goCheck = () => { setKcModuleId(lessonModuleId || 'M01'); onScreenChange('check'); };
  const startCheck = (mid) => { setKcModuleId(mid || 'M01'); onScreenChange('check'); };
  const startLesson = (mid) => { setLessonModuleId(mid || 'M01'); onScreenChange('lesson'); };
  const completeCheck = () => { setCelebOpen(true); onScreenChange('course'); };

  const renderScreen = () => {
    const common = {
      user:USER, gamification:tweaks.gamification, density:tweaks.density,
      openCoach:() => setCoachOpen(true),
      goto: onScreenChange,
      startCheck,
      startLesson
    };
    switch (screen) {
      case 'home':         return <HomeScreen {...common} layoutVariant={tweaks.layoutVariant} />;
      case 'dashboard':    return <DashboardScreen {...common} />;
      case 'course':       return <CourseScreen {...common} />;
      case 'lesson':       return <LessonScreen {...common} onComplete={goCheck} moduleId={lessonModuleId} />;
      case 'check':        return <CheckScreen {...common} onComplete={completeCheck} moduleId={kcModuleId} />;
      case 'paths':        return <PathsScreen {...common} />;
      case 'achievements': return <AchievementsScreen {...common} />;
      case 'leaderboard':  return <LeaderboardScreen {...common} />;
      case 'insights':     return <InsightsScreen {...common} />;
      case 'content':      return <StudioScreen {...common} />;
      case 'settings':     return <SettingsScreen {...common} user={USER} />;
      default:             return <HomeScreen {...common} layoutVariant={tweaks.layoutVariant} />;
    }
  };

  const screenLabels = {
    home:'01 Home', dashboard:'02 Dashboard', course:'03 Course (AI 101)', lesson:'04 Lesson', check:'05 Knowledge Check',
    paths:'06 Paths', achievements:'07 Achievements', leaderboard:'08 Leaderboard',
    insights:'09 Insights', content:'10 Content Studio', settings:'11 Settings'
  };

  const { TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakToggle, TweakButton } = window;

  return (
    <div data-screen-label={screenLabels[screen]} style={{ display:'flex', height:'100vh', overflow:'hidden' }}>
      <Sidebar
        screen={screen}
        setScreen={onScreenChange}
        user={USER}
        level={2}
        journeyPercent={60}
        gamification={tweaks.gamification}
      />
      <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', height:'100vh' }}>
        <Topbar user={USER} level={2} streak={7} gamification={tweaks.gamification} goto={onScreenChange}
          theme={tweaks.theme} setTheme={(v) => setTweak('theme', v)} />
        <div style={{ flex:1, minHeight:0 }}>{renderScreen()}</div>
      </div>

      <Coach open={coachOpen} setOpen={setCoachOpen}
        locked={coachLocked}
        lockedReason={coachLocked ? 'Knowledge checks measure what you actually know. The Coach pauses for the duration of the assessment and resumes the moment you submit.' : undefined}
        contextChip={
        screen === 'lesson' ? `Module ${lessonModuleId.slice(1)} · Lesson` :
        screen === 'check'  ? `Knowledge check · ${kcModuleId}` :
        screen === 'course' ? 'AI 101 · Course' :
        screen === 'home'   ? 'Today · Home' :
        screen.charAt(0).toUpperCase() + screen.slice(1)
      } />

      <LevelUpCelebration open={celebOpen} onClose={() => setCelebOpen(false)} variant={tweaks.celebrationVariant} toLevel={3} />

      {/* Tweaks */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakRadio label="Mode" value={tweaks.theme} onChange={v => setTweak('theme', v)}
          options={[{value:'dark', label:'Dark'}, {value:'light', label:'Light'}]} />
        <TweakSelect label="Accent" value={tweaks.accent} onChange={v => setTweak('accent', v)}
          options={[
            { value:'violet', label:'Violet (default)' },
            { value:'ember',  label:'Ember (warm)' },
            { value:'tide',   label:'Tide (cool)' }
          ]} />
        <TweakRadio label="Type" value={tweaks.type} onChange={v => setTweak('type', v)}
          options={[{value:'grotesque', label:'Grotesque'}, {value:'serif', label:'Serif'}]} />
        <TweakRadio label="Density" value={tweaks.density} onChange={v => setTweak('density', v)}
          options={[{value:'comfy', label:'Comfy'}, {value:'compact', label:'Compact'}]} />

        <TweakSection label="Gamification" />
        <TweakRadio label="Intensity" value={tweaks.gamification} onChange={v => setTweak('gamification', v)}
          options={[
            { value:'subtle',  label:'Subtle' },
            { value:'balanced',label:'Balanced' },
            { value:'bold',    label:'Bold' }
          ]} />

        <TweakSection label="Layout" />
        <TweakRadio label="Home hero" value={tweaks.layoutVariant} onChange={v => setTweak('layoutVariant', v)}
          options={[{value:'hero', label:'Big hero'}, {value:'tight', label:'Tight'}]} />

        <TweakSection label="Celebration" />
        <TweakRadio label="Style" value={tweaks.celebrationVariant} onChange={v => setTweak('celebrationVariant', v)}
          options={[
            { value:'cinematic', label:'Cinematic' },
            { value:'minimal',   label:'Minimal' }
          ]} />
        <TweakButton label="Preview level-up" onClick={() => setCelebOpen(true)} />

        <TweakSection label="Jump to screen" />
        <TweakSelect label="Screen" value={screen} onChange={v => onScreenChange(v)}
          options={[
            { value:'home',         label:'01 · Home (Activity)' },
            { value:'dashboard',    label:'02 · Dashboard' },
            { value:'course',       label:'03 · Course (AI 101)' },
            { value:'lesson',       label:'04 · Lesson reader' },
            { value:'check',        label:'05 · Knowledge check' },
            { value:'paths',        label:'06 · Paths' },
            { value:'achievements', label:'07 · Achievements' },
            { value:'leaderboard',  label:'08 · Leaderboard' },
            { value:'insights',     label:'09 · Insights (admin)' },
            { value:'content',      label:'10 · Content Studio (admin)' },
            { value:'settings',     label:'11 · Settings' },
          ]} />

        <TweakSection label="Lesson" />
        <TweakSelect label="Module" value={lessonModuleId} onChange={v => startLesson(v)}
          options={[
            { value:'M01', label:'M01 · What is AI? (full)' },
            { value:'M04', label:'M04 · Prompting (full)' },
          ]} />

        <TweakSection label="Knowledge check" />
        <TweakSelect label="Module" value={kcModuleId} onChange={v => startCheck(v)}
          options={[
            { value:'M01', label:'M01 · What is AI?' },
            { value:'M02', label:'M02 · How did we get here?' },
            { value:'M03', label:'M03 · Where is this going?' },
            { value:'M04', label:'M04 · Prompting best practices' },
            { value:'M05', label:'M05 · Avoiding hallucinations' },
            { value:'M06', label:'M06 · Right tool for the job' },
            { value:'M07', label:'M07 · Owning AI outputs' },
          ]} />
      </TweaksPanel>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
