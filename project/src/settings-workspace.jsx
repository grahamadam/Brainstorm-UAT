// Workspace (admin) settings — Org, Members, Roles, SSO/SCIM, Integrations,
// AI Governance (deep), Audit log, Compliance, Branding, Danger zone.

const WorkspaceOrg = ({ w, setW }) => {
  const { SettingSection, SettingRow, TextInput, Select } = window.BrSC;
  return (
    <SettingSection kicker="Organization" title="Workspace identity"
      desc="Public-facing details. Changes take effect on next sign-in.">
      <SettingRow label="Workspace name">
        <TextInput value={w.orgName} onChange={v => setW('orgName', v)} width={280}/>
      </SettingRow>
      <SettingRow label="Workspace URL"
        desc="Your subdomain on Brainstorm. Changing this invalidates old links.">
        <TextInput value={w.orgSlug} onChange={v => setW('orgSlug', v)} width={220} mono/>
      </SettingRow>
      <SettingRow label="Verified email domains"
        desc="New users with these domains can self-serve via SSO.">
        <TextInput value={w.orgDomains} onChange={v => setW('orgDomains', v)} width={280} mono/>
      </SettingRow>
      <SettingRow label="Default time zone"
        desc="Used for org-wide reports and content release schedules.">
        <Select value={w.orgTz} onChange={v => setW('orgTz', v)} width={260}
          options={['America/Los_Angeles','America/New_York','Europe/London','Europe/Berlin','Asia/Singapore']}/>
      </SettingRow>
      <SettingRow label="Data residency"
        desc="Where your tenant's data lives at rest. Changing region requires a migration window.">
        <Select value={w.orgRegion} onChange={v => setW('orgRegion', v)} width={220}
          options={[
            { value:'us', label:'United States (us-west-2)' },
            { value:'eu', label:'European Union (eu-central-1)' },
            { value:'ap', label:'Asia Pacific (ap-southeast-1)' },
          ]}/>
      </SettingRow>
    </SettingSection>
  );
};

const WorkspaceMembers = ({ w, setW }) => {
  const { SettingSection, StatusPill } = window.BrSC;
  const { Btn, Avatar } = window.BrPrim;
  const members = [
    { n:'Maya Patel',   r:'Admin',   t:'GTM Ops',     s:'active', last:'12 min ago' },
    { n:'Jordan Lee',   r:'Manager', t:'AE — West',   s:'active', last:'2h ago' },
    { n:'Priya Shah',   r:'Manager', t:'CS — East',   s:'active', last:'5h ago' },
    { n:'Sam Chen',     r:'Learner', t:'AE — Central',s:'active', last:'Yesterday' },
    { n:'Diego Alvarez',r:'Learner', t:'AE — Central',s:'invited',last:'—' },
    { n:'R. Whitfield', r:'Learner', t:'CS — East',   s:'paused', last:'14 days' },
  ];
  return (
    <SettingSection kicker="Members" title="People in this workspace"
      desc="142 active · 8 invited · 3 paused. Provisioning is mirrored from Okta SCIM."
      headerRight={<Btn size="sm">Invite</Btn>}>
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 130px 140px 110px 80px',
        gap:0, fontSize:11, fontFamily:'var(--font-mono)', letterSpacing:'.06em',
        textTransform:'uppercase', color:'var(--text-dim)',
        padding:'4px 0 8px', borderBottom:'1px solid var(--border-soft)'
      }}>
        <div>Name</div><div>Role</div><div>Team</div><div>Status</div><div>Last seen</div>
      </div>
      {members.map((m, i) => (
        <div key={i} style={{
          display:'grid', gridTemplateColumns:'1fr 130px 140px 110px 80px',
          alignItems:'center', gap:0, padding:'10px 0',
          borderBottom: i===members.length-1 ? 'none' : '1px solid var(--border-soft)'
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
            <Avatar initials={m.n.split(' ').map(x=>x[0]).join('').slice(0,2)} ac="var(--accent)" size={28}/>
            <span style={{ fontSize:13, fontWeight:600, color:'var(--text)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{m.n}</span>
          </div>
          <div style={{ fontSize:12, color:'var(--text-sub)' }}>{m.r}</div>
          <div style={{ fontSize:12, color:'var(--text-sub)' }}>{m.t}</div>
          <div>
            {m.s==='active'  && <StatusPill kind="ok"   text="Active"/>}
            {m.s==='invited' && <StatusPill kind="warn" text="Invited"/>}
            {m.s==='paused'  && <StatusPill kind="off"  text="Paused"/>}
          </div>
          <div style={{ fontSize:11.5, color:'var(--text-dim)' }}>{m.last}</div>
        </div>
      ))}
    </SettingSection>
  );
};

const WorkspaceRoles = ({ w, setW }) => {
  const { SettingSection, SettingRow, Toggle } = window.BrSC;
  const { Btn } = window.BrPrim;
  const roles = [
    { name:'Admin',    count:3,   desc:'Full access. Manage settings, billing, content, members.' },
    { name:'Manager',  count:14,  desc:'View team progress, assign quests, see individual reports.' },
    { name:'Author',   count:6,   desc:'Create &amp; publish content in Studio. No member management.' },
    { name:'Learner',  count:119, desc:'Default role. Take lessons, see own progress, peer leaderboard.' },
  ];
  return (
    <>
      <SettingSection kicker="Permissions" title="Roles"
        headerRight={<Btn variant="secondary" size="sm">+ Custom role</Btn>}>
        {roles.map((r, i) => (
          <div key={i} style={{
            display:'grid', gridTemplateColumns:'1fr auto auto', gap:16, alignItems:'center',
            padding:'14px 0', borderTop: i===0 ? 'none' : '1px solid var(--border-soft)'
          }}>
            <div style={{ minWidth:0 }}>
              <div style={{ fontSize:13.5, fontWeight:700, color:'var(--text)' }}>{r.name}</div>
              <div style={{ fontSize:12, color:'var(--text-sub)', marginTop:2 }}
                dangerouslySetInnerHTML={{ __html:r.desc }}/>
            </div>
            <div style={{ fontSize:12, fontFamily:'var(--font-mono)', color:'var(--text-dim)' }}>{r.count} members</div>
            <Btn variant="ghost" size="sm">Edit</Btn>
          </div>
        ))}
      </SettingSection>

      <SettingSection kicker="Defaults" title="Permission defaults">
        <SettingRow label="New members default to" desc="Role assigned when self-serve provisioning kicks in.">
          <select value={w.defaultRole} onChange={e => setW('defaultRole', e.target.value)}
            style={{ background:'var(--card-alt)', border:'1px solid var(--border)', borderRadius:8, padding:'7px 10px', fontSize:13, color:'var(--text)' }}>
            <option value="learner">Learner</option><option value="manager">Manager</option>
          </select>
        </SettingRow>
        <SettingRow label="Managers can invite" desc="Allow non-admin managers to invite new learners on their team.">
          <Toggle value={w.mgrInvite} onChange={v => setW('mgrInvite', v)}/>
        </SettingRow>
        <SettingRow label="Authors require approval" desc="Author-published content needs Admin sign-off before going live.">
          <Toggle value={w.authorApproval} onChange={v => setW('authorApproval', v)}/>
        </SettingRow>
      </SettingSection>
    </>
  );
};

const WorkspaceSSO = ({ w, setW }) => {
  const { SettingSection, SettingRow, Toggle, StatusPill } = window.BrSC;
  const { Btn } = window.BrPrim;
  return (
    <>
      <SettingSection kicker="Identity" title="Single sign-on"
        headerRight={<StatusPill kind="ok" text="Okta · SAML 2.0"/>}>
        <SettingRow label="Require SSO for all members" desc="Disables password login. Recovery via Okta only.">
          <Toggle value={w.ssoRequired} onChange={v => setW('ssoRequired', v)}/>
        </SettingRow>
        <SettingRow label="Allow password fallback for admins"
          desc="Admins can still sign in with a password if your IdP is unreachable. Recommended.">
          <Toggle value={w.ssoAdminFallback} onChange={v => setW('ssoAdminFallback', v)}/>
        </SettingRow>
        <SettingRow label="Session lifetime" desc="How long an SSO session stays valid before re-authentication.">
          <select value={w.ssoSession} onChange={e => setW('ssoSession', e.target.value)}
            style={{ background:'var(--card-alt)', border:'1px solid var(--border)', borderRadius:8, padding:'7px 10px', fontSize:13, color:'var(--text)' }}>
            <option value="8h">8 hours</option><option value="24h">24 hours</option>
            <option value="7d">7 days</option><option value="30d">30 days</option>
          </select>
        </SettingRow>
        <SettingRow label="SAML metadata"
          desc="Download your IdP-facing metadata XML, or upload a new IdP cert.">
          <div style={{ display:'flex', gap:8 }}>
            <Btn variant="ghost" size="sm">Download</Btn>
            <Btn variant="secondary" size="sm">Upload IdP cert</Btn>
          </div>
        </SettingRow>
      </SettingSection>

      <SettingSection kicker="Provisioning" title="SCIM 2.0"
        headerRight={<StatusPill kind="ok" text="Syncing"/>}
        desc="Last full sync 4 min ago · 142 users · 8 groups">
        <SettingRow label="Auto-provision new users" desc="Create a Brainstorm account when an Okta user is added to the app group.">
          <Toggle value={w.scimProvision} onChange={v => setW('scimProvision', v)}/>
        </SettingRow>
        <SettingRow label="Auto-deactivate" desc="Suspend a Brainstorm account immediately when the Okta user is suspended.">
          <Toggle value={w.scimDeprovision} onChange={v => setW('scimDeprovision', v)}/>
        </SettingRow>
        <SettingRow label="Group → Team mapping" desc="Map IdP groups to Brainstorm teams &amp; cohorts.">
          <Btn variant="secondary" size="sm">Configure mapping</Btn>
        </SettingRow>
        <SettingRow label="SCIM bearer token" desc="Rotate to invalidate the existing token. New token shown once.">
          <Btn variant="ghost" size="sm">Rotate token</Btn>
        </SettingRow>
      </SettingSection>
    </>
  );
};

const WorkspaceIntegrations = ({ w, setW }) => {
  const { SettingSection, StatusPill } = window.BrSC;
  const { Btn } = window.BrPrim;
  // Slack + Calendar foregrounded; rest secondary
  const integ = [
    { name:'Slack',     desc:'Notifications, daily digests, /brainstorm slash commands. Posts to #gtm-ai.', status:'ok',   featured:true },
    { name:'Google Calendar', desc:'Schedule lesson focus blocks. Read-only of free/busy; never event contents.', status:'ok',   featured:true },
    { name:'Outlook 365',     desc:'Schedule lesson focus blocks via Microsoft Graph.', status:'off',  featured:true },
    { name:'Gong',      desc:'Call transcripts &amp; deal context for AI Coach examples and content generation.', status:'ok' },
    { name:'Salesforce',desc:'Live opp/account context for personalized examples and quizzes.', status:'ok' },
    { name:'Outreach',  desc:'Sequence templates as live source material in Studio.', status:'off' },
    { name:'Workday',   desc:'HRIS sync — org chart drives team &amp; cohort assignment.', status:'off' },
    { name:'Webhooks &amp; API', desc:'Subscribe to events; query progress via REST. OAuth + bearer.', status:'ok' },
  ];
  const Card = ({ it }) => (
    <div style={{
      border:'1px solid var(--border)', borderRadius:'var(--radius-md)',
      background:'var(--card-alt)', padding:'14px 16px',
      display:'flex', alignItems:'flex-start', gap:14
    }}>
      <div style={{
        width:40, height:40, borderRadius:8, background:'var(--card)',
        border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:'var(--font-display)', fontWeight:800, fontSize:15, color:'var(--text)', flexShrink:0
      }}>{it.name[0]}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:13.5, fontWeight:700, color:'var(--text)' }} dangerouslySetInnerHTML={{ __html:it.name }}/>
          {it.status==='ok'  && <StatusPill kind="ok"  text="Connected"/>}
          {it.status==='off' && <StatusPill kind="off" text="Not connected"/>}
          {it.status==='warn'&& <StatusPill kind="warn" text="Needs attention"/>}
        </div>
        <div style={{ fontSize:12, color:'var(--text-sub)', marginTop:4, lineHeight:1.5 }}
          dangerouslySetInnerHTML={{ __html:it.desc }}/>
        <div style={{ display:'flex', gap:8, marginTop:10 }}>
          <Btn variant={it.status==='ok' ? 'ghost' : 'secondary'} size="sm">
            {it.status==='ok' ? 'Configure' : 'Connect'}
          </Btn>
          {it.status==='ok' && <Btn variant="ghost" size="sm">Disconnect</Btn>}
        </div>
      </div>
    </div>
  );
  return (
    <>
      <SettingSection kicker="Featured" title="Slack &amp; Calendar"
        desc="Where Brainstorm shows up day-to-day for your team.">
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:12 }}>
          {integ.filter(i => i.featured).map((it, i) => <Card key={i} it={it}/>)}
        </div>
      </SettingSection>

      <SettingSection kicker="More" title="Other connections">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {integ.filter(i => !i.featured).map((it, i) => <Card key={i} it={it}/>)}
        </div>
      </SettingSection>
    </>
  );
};

const WorkspaceAI = ({ w, setW }) => {
  const { SettingSection, SettingRow, Toggle, Segmented, Slider, Select, StatusPill } = window.BrSC;
  const { Btn } = window.BrPrim;
  return (
    <>
      <SettingSection kicker="Kill switch" title="Master switch"
        accent="var(--accent-2)"
        desc="Disable all AI features org-wide in one click. Existing transcripts remain readable; no new generation."
        headerRight={
          w.aiKill
            ? <StatusPill kind="err"  text="AI disabled"/>
            : <StatusPill kind="ok"   text="AI enabled"/>
        }>
        <SettingRow danger label="Disable Coach, Studio, and AI checks org-wide">
          <Toggle value={w.aiKill} onChange={v => setW('aiKill', v)}/>
        </SettingRow>
      </SettingSection>

      <SettingSection kicker="Models" title="Allowed models &amp; providers"
        desc="Pin the model floor and ceiling for your tenant. Per-team overrides below.">
        <SettingRow label="Allowed providers">
          <Segmented value={w.aiProvider} onChange={v => setW('aiProvider', v)}
            options={[
              { value:'anthropic',     label:'Anthropic only' },
              { value:'multi',         label:'Multi-provider' },
              { value:'private',       label:'Private deployment' },
            ]}/>
        </SettingRow>
        <SettingRow label="Floor model" desc="The simplest model the Coach is allowed to use.">
          <Select value={w.aiFloor} onChange={v => setW('aiFloor', v)} width={220}
            options={['Haiku-class','Sonnet-class','Opus-class']}/>
        </SettingRow>
        <SettingRow label="Ceiling model" desc="Most capable model permitted. Cost &amp; latency cap.">
          <Select value={w.aiCeiling} onChange={v => setW('aiCeiling', v)} width={220}
            options={['Sonnet-class','Opus-class','Opus-Pro']}/>
        </SettingRow>
      </SettingSection>

      <SettingSection kicker="Data &amp; training" title="Data handling">
        <SettingRow label="No-train flag (zero data retention)"
          desc="All Coach traffic uses ZDR endpoints. Inputs and outputs are not used to train any model.">
          <Toggle value={w.aiNoTrain} onChange={v => setW('aiNoTrain', v)}/>
        </SettingRow>
        <SettingRow label="PII redaction" desc="Strip emails, phone numbers, SSNs, and account IDs from prompts before sending to providers.">
          <Segmented value={w.aiRedact} onChange={v => setW('aiRedact', v)}
            options={[{value:'off',label:'Off'},{value:'standard',label:'Standard'},{value:'strict',label:'Strict'}]}/>
        </SettingRow>
        <SettingRow label="Prompt &amp; response logging"
          desc="Retain full prompts and responses for audit. Stored encrypted in your tenant. Not used for training.">
          <Toggle value={w.aiLog} onChange={v => setW('aiLog', v)}/>
        </SettingRow>
        <SettingRow label="Log retention" desc="Logs auto-delete after this period.">
          <Select value={w.aiLogTtl} onChange={v => setW('aiLogTtl', v)} width={180}
            options={['30 days','90 days','180 days','1 year','7 years']}/>
        </SettingRow>
      </SettingSection>

      <SettingSection kicker="Safety" title="Content filters &amp; eval thresholds"
        desc="Inputs and outputs are passed through configurable filters. Failed checks are blocked or escalated.">
        <SettingRow label="Toxicity / harassment filter">
          <Segmented value={w.aiTox} onChange={v => setW('aiTox', v)}
            options={[{value:'low',label:'Loose'},{value:'medium',label:'Medium'},{value:'high',label:'Strict'}]}/>
        </SettingRow>
        <SettingRow label="PII / data exfil filter" desc="Blocks responses containing customer PII pulled from CRM.">
          <Toggle value={w.aiExfil} onChange={v => setW('aiExfil', v)}/>
        </SettingRow>
        <SettingRow label="Hallucination guard threshold"
          desc="Coach answers below this confidence are auto-rephrased as questions or held for review.">
          <Slider value={w.aiHallu} min={0} max={100} step={5} onChange={v => setW('aiHallu', v)}
            format={v => `${v}%`}/>
        </SettingRow>
        <SettingRow label="Eval suite" desc="Run weekly evals on Coach outputs against your own gold-standard set.">
          <Btn variant="secondary" size="sm">Open evals</Btn>
        </SettingRow>
      </SettingSection>

      <SettingSection kicker="Per-team policies" title="Team overrides"
        desc="Override the org-wide policy for sensitive teams. Stricter is enforced; looser requires admin approval.">
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 130px 110px 110px',
          fontSize:11, fontFamily:'var(--font-mono)', letterSpacing:'.06em', textTransform:'uppercase',
          color:'var(--text-dim)', padding:'4px 0 8px', borderBottom:'1px solid var(--border-soft)'
        }}>
          <div>Team</div><div>Provider</div><div>Logging</div><div>Filters</div>
        </div>
        {[
          { t:'GTM (default)',         p:'Multi',   l:'On',  f:'Medium' },
          { t:'Customer Success — EU', p:'EU only', l:'On',  f:'Strict' },
          { t:'Legal &amp; Compliance', p:'Anthropic', l:'On', f:'Strict' },
          { t:'Engineering pilot',     p:'Multi',   l:'Off', f:'Loose'  },
        ].map((r, i) => (
          <div key={i} style={{
            display:'grid', gridTemplateColumns:'1fr 130px 110px 110px', gap:0,
            padding:'10px 0', borderBottom: i===3 ? 'none' : '1px solid var(--border-soft)',
            alignItems:'center'
          }}>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}
              dangerouslySetInnerHTML={{ __html:r.t }}/>
            <div style={{ fontSize:12, color:'var(--text-sub)' }}>{r.p}</div>
            <div style={{ fontSize:12, color:'var(--text-sub)' }}>{r.l}</div>
            <div style={{ fontSize:12, color:'var(--text-sub)' }}>{r.f}</div>
          </div>
        ))}
        <div style={{ marginTop:14, display:'flex', justifyContent:'flex-end' }}>
          <Btn variant="secondary" size="sm">+ Override</Btn>
        </div>
      </SettingSection>
    </>
  );
};

const WorkspaceAudit = ({ w, setW }) => {
  const { SettingSection, SettingRow, Toggle, Select } = window.BrSC;
  const { Btn } = window.BrPrim;
  const events = [
    { t:'2m ago',  who:'Maya Patel',  act:'Updated AI policy',     d:'Hallucination guard 60% → 75%' },
    { t:'1h ago',  who:'SCIM',        act:'Provisioned user',      d:'diego.alvarez@gong.io' },
    { t:'3h ago',  who:'Jordan Lee',  act:'Assigned quest',        d:'Discovery → AE West (12 members)' },
    { t:'Yesterday',who:'Maya Patel', act:'Rotated SCIM token',    d:'Token …a91 invalidated' },
    { t:'2d ago',  who:'Author bot',  act:'Published lesson',      d:'Crafting Killer Demos · v3' },
    { t:'5d ago',  who:'Maya Patel',  act:'Enabled prompt logging',d:'Org-wide · 90-day retention' },
  ];
  return (
    <>
      <SettingSection kicker="Audit log" title="Recent admin activity"
        headerRight={<Btn variant="ghost" size="sm">Export CSV</Btn>}>
        {events.map((e, i) => (
          <div key={i} style={{
            display:'grid', gridTemplateColumns:'90px 140px 1fr',
            gap:14, alignItems:'center', padding:'10px 0',
            borderTop: i===0 ? 'none' : '1px solid var(--border-soft)'
          }}>
            <div style={{ fontSize:11.5, fontFamily:'var(--font-mono)', color:'var(--text-dim)' }}>{e.t}</div>
            <div style={{ fontSize:12.5, color:'var(--text-sub)' }}>{e.who}</div>
            <div style={{ minWidth:0 }}>
              <span style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{e.act}</span>
              <span style={{ fontSize:12, color:'var(--text-dim)', marginLeft:10 }}>· {e.d}</span>
            </div>
          </div>
        ))}
      </SettingSection>

      <SettingSection kicker="Streaming" title="Forward audit events">
        <SettingRow label="SIEM forwarding" desc="Stream events in real time to Splunk, Datadog, or any S3-compatible bucket.">
          <Toggle value={w.siem} onChange={v => setW('siem', v)}/>
        </SettingRow>
        <SettingRow label="Destination">
          <Select value={w.siemDest} onChange={v => setW('siemDest', v)} width={200}
            options={['Splunk HEC','Datadog Logs','AWS S3','Webhook']}/>
        </SettingRow>
      </SettingSection>
    </>
  );
};

const WorkspaceCompliance = ({ w, setW }) => {
  const { SettingSection, SettingRow, Toggle, Select } = window.BrSC;
  const { Btn } = window.BrPrim;
  const badges = [
    { name:'SOC 2 Type II', s:'ok',   detail:'Last audit: 2025-09 · A-LIGN' },
    { name:'GDPR + DPA',    s:'ok',   detail:'EU representative on file · DPA available' },
    { name:'ISO 27001',     s:'ok',   detail:'Cert valid through 2026-02' },
    { name:'HIPAA',         s:'off',  detail:'Available on Enterprise tier · BAA required' },
    { name:'FedRAMP',       s:'warn', detail:'Moderate authorization in progress' },
  ];
  return (
    <>
      <SettingSection kicker="Posture" title="Compliance &amp; certifications">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {badges.map((b, i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:12,
              padding:'12px 14px', background:'var(--card-alt)',
              border:'1px solid var(--border)', borderRadius:10
            }}>
              <div style={{
                width:34, height:34, borderRadius:8, flexShrink:0,
                background: b.s==='ok' ? 'rgba(76,254,200,0.10)' : b.s==='warn' ? 'rgba(255,224,63,0.10)' : 'var(--card)',
                border:'1px solid var(--border)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color: b.s==='ok' ? 'var(--green)' : b.s==='warn' ? '#FFE03F' : 'var(--text-dim)',
                fontFamily:'var(--font-mono)', fontSize:11, fontWeight:700
              }}>{b.s==='ok' ? '✓' : b.s==='warn' ? '…' : '—'}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{b.name}</div>
                <div style={{ fontSize:11.5, color:'var(--text-sub)', marginTop:2 }}>{b.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </SettingSection>

      <SettingSection kicker="Documents" title="Trust documents">
        <SettingRow label="DPA, sub-processors, SOC 2 report" desc="Available on request. Most can be self-served from the trust portal.">
          <Btn variant="secondary" size="sm">Open trust portal</Btn>
        </SettingRow>
      </SettingSection>

      <SettingSection kicker="Retention" title="Data retention">
        <SettingRow label="Learner activity logs" desc="How long quest events &amp; quiz answers are retained.">
          <Select value={w.retActivity} onChange={v => setW('retActivity', v)} width={160}
            options={['90 days','1 year','3 years','7 years','Forever']}/>
        </SettingRow>
        <SettingRow label="Coach transcripts" desc="Encrypted in your tenant; never used for training.">
          <Select value={w.retCoach} onChange={v => setW('retCoach', v)} width={160}
            options={['30 days','90 days','1 year','3 years']}/>
        </SettingRow>
        <SettingRow label="Customer-managed encryption keys (CMEK)"
          desc="Bring your own KMS key for at-rest encryption. Available on Enterprise.">
          <Toggle value={w.cmek} onChange={v => setW('cmek', v)}/>
        </SettingRow>
      </SettingSection>
    </>
  );
};

const WorkspaceBranding = ({ w, setW }) => {
  const { SettingSection, SettingRow, TextInput, Toggle } = window.BrSC;
  return (
    <SettingSection kicker="Brand" title="Workspace branding"
      desc="Appears on the login page, exported reports, and Slack message attachments.">
      <SettingRow label="Logo" desc="SVG or PNG, ≥ 256px, transparent background.">
        <input type="file" accept="image/*" style={{ fontSize:12, color:'var(--text-sub)' }}/>
      </SettingRow>
      <SettingRow label="Primary color" desc="Used for accents in branded surfaces. Doesn't affect Tweaks.">
        <TextInput value={w.brandColor} onChange={v => setW('brandColor', v)} width={120} mono/>
      </SettingRow>
      <SettingRow label="Login page tagline">
        <TextInput value={w.tagline} onChange={v => setW('tagline', v)} width={320}/>
      </SettingRow>
      <SettingRow label="Show 'Powered by Brainstorm'" desc="Available to remove on Enterprise.">
        <Toggle value={w.poweredBy} onChange={v => setW('poweredBy', v)}/>
      </SettingRow>
    </SettingSection>
  );
};

const WorkspaceDanger = ({ w, setW }) => {
  const { SettingSection, SettingRow } = window.BrSC;
  const { Btn } = window.BrPrim;
  return (
    <SettingSection kicker="Danger zone" title="Destructive actions"
      accent="var(--accent-2)"
      desc="Each action requires a typed confirmation. Most can be reversed for 30 days from the trust portal.">
      <SettingRow danger label="Rotate all API keys"
        desc="Invalidates every active API key, OAuth token, and SCIM bearer. Apps must re-authenticate.">
        <Btn variant="ghost" size="sm">Rotate keys…</Btn>
      </SettingRow>
      <SettingRow danger label="Force sign-out all users"
        desc="Ends every active session, including yours. Useful after a compromised credential.">
        <Btn variant="ghost" size="sm">Force sign-out…</Btn>
      </SettingRow>
      <SettingRow danger label="Wipe team progress"
        desc="Reset XP, streaks, and completions for an entire team. Content authoring is preserved.">
        <Btn variant="ghost" size="sm">Wipe team…</Btn>
      </SettingRow>
      <SettingRow danger label="Export-then-delete (Data takeout)"
        desc="Generate a full archive of workspace data, then permanently delete the tenant. 14-day cooling-off period.">
        <Btn variant="ghost" size="sm">Begin takeout…</Btn>
      </SettingRow>
    </SettingSection>
  );
};

window.BrSettingsWorkspace = {
  WorkspaceOrg, WorkspaceMembers, WorkspaceRoles, WorkspaceSSO,
  WorkspaceIntegrations, WorkspaceAI, WorkspaceAudit, WorkspaceCompliance,
  WorkspaceBranding, WorkspaceDanger
};
