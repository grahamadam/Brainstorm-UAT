// Personal settings sections — Profile, Notifications, AI Coach, Connected apps,
// Accessibility, Language & region, Privacy, Sign-in & sessions, Data.
//
// All controls call setS(key, value) which auto-saves to localStorage and pulses a toast.

const PersonalProfile = ({ s, setS, user }) => {
  const { SettingSection, SettingRow, TextInput, Select } = window.BrSC;
  const { Avatar, Btn } = window.BrPrim;
  return (
    <SettingSection
      kicker="Account"
      title="Profile"
      desc="How you appear to teammates across Brainstorm — feed, leaderboard, mentions."
    >
      <div style={{
        display:'flex', alignItems:'center', gap:18, padding:'4px 0 18px',
        borderBottom:'1px solid var(--border-soft)', marginBottom:4
      }}>
        <Avatar initials={(s.name || 'U').split(' ').map(x=>x[0]).join('').slice(0,2)} ac="var(--accent)" size={68}/>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:15, fontWeight:700, color:'var(--text)' }}>{s.name}</div>
          <div style={{ fontSize:12, color:'var(--text-sub)', marginTop:2 }}>{user?.team} · {s.role}</div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <Btn variant="ghost" size="sm">Remove</Btn>
          <Btn variant="secondary" size="sm">Upload</Btn>
        </div>
      </div>

      <SettingRow label="Display name" desc="Shown on your profile, leaderboard, and feed posts.">
        <TextInput value={s.name} onChange={v => setS('name', v)} width={260}/>
      </SettingRow>
      <SettingRow label="Pronouns" desc="Optional. Appears next to your name in mentions.">
        <Select value={s.pronouns} onChange={v => setS('pronouns', v)} width={200}
          options={[
            { value:'',           label:'— Not specified —' },
            { value:'she/her',    label:'she/her' },
            { value:'he/him',     label:'he/him' },
            { value:'they/them',  label:'they/them' },
            { value:'custom',     label:'Custom…' },
          ]}/>
      </SettingRow>
      <SettingRow label="Job title" desc="Used by the Coach to tailor examples to your role.">
        <TextInput value={s.title} onChange={v => setS('title', v)} width={260}/>
      </SettingRow>
      <SettingRow label="Time zone" desc="Drives daily nudges, streak rollover, and calendar focus blocks.">
        <Select value={s.tz} onChange={v => setS('tz', v)} width={260}
          options={[
            'America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York',
            'Europe/London', 'Europe/Paris', 'Europe/Berlin',
            'Asia/Singapore', 'Asia/Tokyo', 'Australia/Sydney'
          ]}/>
      </SettingRow>
    </SettingSection>
  );
};

const PersonalNotifications = ({ s, setS }) => {
  const { SettingSection, SettingRow, Toggle, Segmented, Select } = window.BrSC;
  return (
    <>
      <SettingSection
        kicker="Slack"
        title="Slack notifications"
        desc="Brainstorm posts via the Brainstorm app — connected to #gtm-ai by your admin."
        headerRight={<span style={{
          fontSize:11, color:'var(--text-sub)', display:'inline-flex', alignItems:'center', gap:6
        }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--green)' }}/>
          Connected as @{(s.name||'you').toLowerCase().split(' ')[0]}
        </span>}
      >
        <SettingRow label="Daily nudge" desc="A friendly DM at the start of your work block. Skips weekends.">
          <Toggle value={s.slackDaily} onChange={v => setS('slackDaily', v)}/>
        </SettingRow>
        <SettingRow label="Streak warnings" desc="Pings you 2 hours before your streak expires.">
          <Toggle value={s.slackStreak} onChange={v => setS('slackStreak', v)}/>
        </SettingRow>
        <SettingRow label="Team activity" desc="Quest completions, badge unlocks, leaderboard changes in your cohort.">
          <Segmented value={s.slackTeam} onChange={v => setS('slackTeam', v)}
            options={[{value:'off',label:'Off'},{value:'digest',label:'Daily digest'},{value:'live',label:'Live'}]}/>
        </SettingRow>
        <SettingRow label="Coach insights" desc="When the Coach spots a pattern in your calls or quizzes.">
          <Toggle value={s.slackCoach} onChange={v => setS('slackCoach', v)}/>
        </SettingRow>
        <SettingRow label="Quiet hours" desc="No DMs sent during this window — banked for next morning.">
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <Select value={s.slackQuietStart} onChange={v => setS('slackQuietStart', v)} width={84}
              options={['18:00','19:00','20:00','21:00','22:00']}/>
            <span style={{ fontSize:11, color:'var(--text-dim)' }}>→</span>
            <Select value={s.slackQuietEnd} onChange={v => setS('slackQuietEnd', v)} width={84}
              options={['07:00','08:00','09:00','10:00']}/>
          </div>
        </SettingRow>
      </SettingSection>

      <SettingSection
        kicker="Calendar"
        title="Calendar focus blocks"
        desc="Brainstorm can hold time on your calendar for lessons. We never read event contents."
      >
        <SettingRow label="Auto-schedule lessons" desc="Drop 25-minute focus blocks for active quests.">
          <Toggle value={s.calAuto} onChange={v => setS('calAuto', v)}/>
        </SettingRow>
        <SettingRow label="Block frequency" desc="How many learning blocks per week.">
          <Segmented value={s.calFreq} onChange={v => setS('calFreq', v)}
            options={[{value:'2',label:'2/wk'},{value:'3',label:'3/wk'},{value:'5',label:'5/wk'}]}/>
        </SettingRow>
        <SettingRow label="Preferred time of day">
          <Segmented value={s.calWhen} onChange={v => setS('calWhen', v)}
            options={[{value:'am',label:'Morning'},{value:'pm',label:'Afternoon'},{value:'any',label:'Any'}]}/>
        </SettingRow>
        <SettingRow label="Calendar source">
          <Select value={s.calSource} onChange={v => setS('calSource', v)} width={200}
            options={[
              { value:'google',  label:'Google Calendar' },
              { value:'outlook', label:'Outlook 365' },
              { value:'none',    label:'— Disconnected —' },
            ]}/>
        </SettingRow>
      </SettingSection>

      <SettingSection kicker="Email" title="Email" desc="Used sparingly — most things go through Slack.">
        <SettingRow label="Weekly recap" desc="What you learned, where you rank, what's next.">
          <Toggle value={s.emailRecap} onChange={v => setS('emailRecap', v)}/>
        </SettingRow>
        <SettingRow label="Product announcements" desc="New courses, features, and content drops.">
          <Toggle value={s.emailProduct} onChange={v => setS('emailProduct', v)}/>
        </SettingRow>
      </SettingSection>
    </>
  );
};

const PersonalCoach = ({ s, setS }) => {
  const { SettingSection, SettingRow, Toggle, Segmented, Slider, Select } = window.BrSC;
  return (
    <SettingSection
      kicker="AI Coach"
      title="How the Coach talks to you"
      desc="Personal preferences. Your admin has separately gated which models and behaviors are allowed org-wide — see Workspace → AI Governance."
    >
      <SettingRow label="Tone" desc="How the Coach phrases feedback and explanations.">
        <Segmented value={s.coachTone} onChange={v => setS('coachTone', v)}
          options={[
            {value:'concise',  label:'Concise'},
            {value:'warm',     label:'Warm'},
            {value:'socratic', label:'Socratic'},
          ]}/>
      </SettingRow>
      <SettingRow label="Verbosity" desc="Lower → terse, lower-friction. Higher → detailed, with examples.">
        <Slider value={s.coachVerbosity} min={1} max={5} step={1}
          onChange={v => setS('coachVerbosity', v)}
          format={v => ['Terse','Brief','Balanced','Thorough','Encyclopedic'][v-1]}/>
      </SettingRow>
      <SettingRow label="Use my call & deal context"
        desc="Coach can reference your Gong calls and Salesforce opps for relevant examples. Stored in your tenant; never used for training.">
        <Toggle value={s.coachContext} onChange={v => setS('coachContext', v)}/>
      </SettingRow>
      <SettingRow label="Long-term memory"
        desc="Remember your strengths, blind spots, and preferences across sessions. View &amp; clear in Coach settings.">
        <Toggle value={s.coachMemory} onChange={v => setS('coachMemory', v)}/>
      </SettingRow>
      <SettingRow label="Default model"
        desc="Personal preference within the org-allowed list. Speed-vs-depth tradeoff.">
        <Select value={s.coachModel} onChange={v => setS('coachModel', v)} width={220}
          options={[
            { value:'fast',     label:'Fast (Haiku-class)' },
            { value:'balanced', label:'Balanced (Sonnet-class)' },
            { value:'deep',     label:'Deep (Opus-class)' },
          ]}/>
      </SettingRow>
    </SettingSection>
  );
};

const PersonalAccessibility = ({ s, setS }) => {
  const { SettingSection, SettingRow, Toggle, Segmented, Slider } = window.BrSC;
  return (
    <SettingSection
      kicker="Accessibility"
      title="Accessibility"
      desc="Applies to your account everywhere — web, Slack embeds, and mobile."
    >
      <SettingRow label="Reduce motion" desc="Disable confetti, level-up bursts, and decorative animations.">
        <Toggle value={s.reduceMotion} onChange={v => setS('reduceMotion', v)}/>
      </SettingRow>
      <SettingRow label="High-contrast mode" desc="Stronger borders, no soft shadows, full-opacity text.">
        <Toggle value={s.highContrast} onChange={v => setS('highContrast', v)}/>
      </SettingRow>
      <SettingRow label="Text size" desc="Scales body copy and UI labels. Lesson reader has its own slider.">
        <Slider value={s.textScale} min={90} max={130} step={5}
          onChange={v => setS('textScale', v)}
          format={v => `${v}%`}/>
      </SettingRow>
      <SettingRow label="Captions" desc="Show captions on Coach voice replies and embedded videos.">
        <Segmented value={s.captions} onChange={v => setS('captions', v)}
          options={[{value:'off',label:'Off'},{value:'auto',label:'Auto'},{value:'always',label:'Always'}]}/>
      </SettingRow>
      <SettingRow label="Keyboard navigation hints" desc="Show ⌘K-style shortcut overlays on hover.">
        <Toggle value={s.keyboardHints} onChange={v => setS('keyboardHints', v)}/>
      </SettingRow>
      <SettingRow label="Screen reader optimizations" desc="Add ARIA descriptions to gamification visuals; describe charts in prose.">
        <Toggle value={s.srMode} onChange={v => setS('srMode', v)}/>
      </SettingRow>
    </SettingSection>
  );
};

const PersonalLanguage = ({ s, setS }) => {
  const { SettingSection, SettingRow, Select, Segmented } = window.BrSC;
  return (
    <SettingSection
      kicker="Region"
      title="Language &amp; region"
      desc="Affects content language, dates, numbers, and the working-week boundary."
    >
      <SettingRow label="Display language" desc="UI strings. Lessons translate on demand via the Coach.">
        <Select value={s.lang} onChange={v => setS('lang', v)} width={220}
          options={[
            { value:'en-US',  label:'English (United States)' },
            { value:'en-GB',  label:'English (United Kingdom)' },
            { value:'es-ES',  label:'Español' },
            { value:'fr-FR',  label:'Français' },
            { value:'de-DE',  label:'Deutsch' },
            { value:'pt-BR',  label:'Português (Brasil)' },
            { value:'ja-JP',  label:'日本語' },
          ]}/>
      </SettingRow>
      <SettingRow label="Region format" desc="Currency, units, and number formatting.">
        <Select value={s.region} onChange={v => setS('region', v)} width={220}
          options={['United States','United Kingdom','Germany','France','Brazil','Japan','Australia']}/>
      </SettingRow>
      <SettingRow label="Date format">
        <Segmented value={s.dateFmt} onChange={v => setS('dateFmt', v)}
          options={[
            { value:'mdy', label:'M/D/Y' },
            { value:'dmy', label:'D/M/Y' },
            { value:'iso', label:'ISO' },
          ]}/>
      </SettingRow>
      <SettingRow label="Week starts on">
        <Segmented value={s.weekStart} onChange={v => setS('weekStart', v)}
          options={[{value:'sun',label:'Sunday'},{value:'mon',label:'Monday'}]}/>
      </SettingRow>
    </SettingSection>
  );
};

const PersonalPrivacy = ({ s, setS }) => {
  const { SettingSection, SettingRow, Segmented, Toggle } = window.BrSC;
  return (
    <SettingSection
      kicker="Privacy"
      title="What teammates see about me"
      desc="Your manager always sees your progress in their dashboard. These controls govern peers and the public org view."
    >
      <SettingRow label="Leaderboard visibility" desc="Where your name appears on the public leaderboard.">
        <Segmented value={s.lbVis} onChange={v => setS('lbVis', v)}
          options={[
            {value:'public', label:'Visible'},
            {value:'cohort', label:'Cohort only'},
            {value:'hidden', label:'Anonymous'},
          ]}/>
      </SettingRow>
      <SettingRow label="Activity feed" desc="Whether your quest completions and badges appear in #gtm-ai feed.">
        <Toggle value={s.feedVis} onChange={v => setS('feedVis', v)}/>
      </SettingRow>
      <SettingRow label="Profile visibility" desc="Allow peers to view your full profile and progress.">
        <Segmented value={s.profileVis} onChange={v => setS('profileVis', v)}
          options={[
            {value:'org',    label:'Whole org'},
            {value:'team',   label:'My team'},
            {value:'private',label:'Just me'},
          ]}/>
      </SettingRow>
      <SettingRow label="Use my completions to train teammates"
        desc="When you ace a check, your reasoning may surface (anonymously) as an exemplar to peers stuck on the same item.">
        <Toggle value={s.exemplars} onChange={v => setS('exemplars', v)}/>
      </SettingRow>
    </SettingSection>
  );
};

const PersonalSecurity = ({ s, setS }) => {
  const { SettingSection, SettingRow, Toggle } = window.BrSC;
  const { Btn } = window.BrPrim;
  const sessions = [
    { label:'MacBook Pro · Chrome',  loc:'San Francisco, CA',  when:'Current session', current:true },
    { label:'iPhone 15 · Safari',    loc:'San Francisco, CA',  when:'2h ago' },
    { label:'Slack desktop',         loc:'OAuth · #gtm-ai',    when:'Yesterday' },
  ];
  return (
    <>
      <SettingSection kicker="Security" title="Sign-in &amp; sessions">
        <SettingRow label="Two-factor authentication" desc="Required after every 14 days, or on a new device.">
          <Toggle value={s.twoFA} onChange={v => setS('twoFA', v)}/>
        </SettingRow>
        <SettingRow label="Recovery codes" desc="Generate a fresh set of one-time codes. Old codes are invalidated.">
          <Btn variant="secondary" size="sm">Generate codes</Btn>
        </SettingRow>
        <SettingRow label="Passkeys" desc="Sign in with your device biometrics. Recommended.">
          <Btn variant="secondary" size="sm">Add passkey</Btn>
        </SettingRow>
      </SettingSection>

      <SettingSection kicker="Devices" title="Active sessions"
        desc="Sessions sign out automatically after 30 days of inactivity, per workspace policy.">
        <div>
          {sessions.map((sess, i) => (
            <div key={i} style={{
              display:'grid', gridTemplateColumns:'1fr auto auto', alignItems:'center', gap:16,
              padding:'12px 0', borderTop: i===0 ? 'none' : '1px solid var(--border-soft)'
            }}>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{sess.label}</div>
                <div style={{ fontSize:11.5, color:'var(--text-sub)', marginTop:2 }}>{sess.loc} · {sess.when}</div>
              </div>
              {sess.current && <span style={{
                fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--green)',
                letterSpacing:'.08em', textTransform:'uppercase'
              }}>Active</span>}
              <Btn variant="ghost" size="sm" disabled={sess.current}>Sign out</Btn>
            </div>
          ))}
        </div>
        <div style={{ marginTop:14, paddingTop:14, borderTop:'1px solid var(--border-soft)', display:'flex', justifyContent:'flex-end' }}>
          <Btn variant="secondary" size="sm">Sign out all other devices</Btn>
        </div>
      </SettingSection>
    </>
  );
};

const PersonalData = ({ s, setS }) => {
  const { SettingSection, SettingRow } = window.BrSC;
  const { Btn } = window.BrPrim;
  return (
    <>
      <SettingSection kicker="Your data" title="Export &amp; download">
        <SettingRow label="Export learning history"
          desc="JSON archive of your quests, completions, quiz answers, badges, and Coach transcripts. Ready in &lt; 5 min.">
          <Btn variant="secondary" size="sm">Request export</Btn>
        </SettingRow>
        <SettingRow label="Coach memory"
          desc="View, search, or selectively delete what the Coach remembers about you.">
          <Btn variant="ghost" size="sm">Open memory</Btn>
        </SettingRow>
      </SettingSection>

      <SettingSection kicker="Danger zone" title="Reset &amp; delete"
        accent="var(--accent-2)"
        desc="These actions are permanent. We require a separate confirmation step before anything is destroyed.">
        <SettingRow danger label="Reset my progress"
          desc="Clears XP, streak, badges, and completed quests. Your account stays. Your manager will be notified.">
          <Btn variant="ghost" size="sm">Reset progress…</Btn>
        </SettingRow>
        <SettingRow danger label="Delete my account"
          desc="Removes your profile from this workspace. Your data is purged after 30 days unless your admin enforces a longer retention period.">
          <Btn variant="ghost" size="sm">Delete account…</Btn>
        </SettingRow>
      </SettingSection>
    </>
  );
};

window.BrSettingsPersonal = {
  PersonalProfile, PersonalNotifications, PersonalCoach,
  PersonalAccessibility, PersonalLanguage, PersonalPrivacy,
  PersonalSecurity, PersonalData
};
