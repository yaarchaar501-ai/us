import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Music2, Volume2, VolumeX, Sparkles, LockKeyhole, Stars, ArrowDown, Play, Pause, Images } from 'lucide-react'
import './style.css'

// Add your files in public/photos and public/music.
// Keep these names, or edit the arrays/constant below to match your filenames.
const PHOTO_FILES = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg', 'photo6.jpg']
const SONG_FILE = '/music/our-song.mp3'

const photoCaptions = [
  'Tumhare saath har pal thoda aur khoobsurat lagta hai.',
  'Kuch yaadein tasveer se zyada dil mein rehti hain.',
  'Meri favourite jagah? Jahan tum mere paas ho.',
  'Bas tum, main, aur ye chhote-chhote special moments.',
  'Tumhari smile — meri personal weakness.',
  'Aise hi saath rehna, har aane wale kal mein.'
]

const reasons = [
  'Tumhari smile meri saari tension ka shortcut solution hai.',
  'Tumhara nakhra bhi mujhe cute lagta hai — haan, kabhi-kabhi zyada cute!',
  'Tumse baat karke normal sa din bhi special ban jaata hai.',
  'Tumhare paas hone ka ehsaas hi mere liye sukoon hai.',
  'Yr aur pls hmare closeness ko mt alg hone do jisse hum dono ko frq pre... nhi acha lgta h bilkul bhi apke ahsaas ke bina jo hum kr chuke h ',
  'Aur aap meri ho isse bda reason aur kya ho skta h'
  
]

const proposalReplies = [
  'Tumhara ye jawab mere dil ne pehle hi save kar liya tha. Thank you meri jaan, mujhe choose karne ke liye. ❤️',
  'Awww! Itni pyaari haan ke baad toh main aur bhi zyada tumhara ho gaya. Main har din tumhe choose karunga. 💗',
  'Deal pakki! Main tumhe hasane, tang karne aur pyaar karne ka lifetime contract sign karta hoon. 😘',
  'Meri favourite person ka favourite jawab! Tumhara haath aur mera saath — hamesha. 🥹',
  'Isse pyaara jawab ho hi nahi sakta. Thank you meri Alka, meri duniya banne ke liye. 💞'
]

function App() {
  const [hearts, setHearts] = useState([])
  const [reason, setReason] = useState(0)
  const [reply, setReply] = useState('')
  const [playing, setPlaying] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)
  const [secretOpen, setSecretOpen] = useState(false)

  const burst = (count = 24) => {
    const batch = Array.from({ length: count }, (_, i) => ({
      id: `${Date.now()}-${Math.random()}-${i}`,
      left: 12 + Math.random() * 76,
      delay: Math.random() * 0.45,
      size: 13 + Math.random() * 25,
      drift: (Math.random() - 0.5) * 220,
      duration: 2.8 + Math.random() * 2.2
    }))
    setHearts(h => [...h, ...batch])
    window.setTimeout(() => setHearts(h => h.filter(x => !batch.some(b => b.id === x.id))), 5600)
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      const id = `ambient-${Date.now()}-${Math.random()}`
      setHearts(h => [...h.slice(-36), {
        id, left: 2 + Math.random() * 96, delay: 0, size: 10 + Math.random() * 15,
        drift: (Math.random() - .5) * 90, duration: 8 + Math.random() * 7, ambient: true
      }])
      window.setTimeout(() => setHearts(h => h.filter(x => x.id !== id)), 16000)
    }, 850)
    return () => window.clearInterval(timer)
  }, [])

  const gallery = useMemo(() => PHOTO_FILES.map((file, i) => ({
    src: `/photos/${file}`, caption: photoCaptions[i % photoCaptions.length], index: i
  })), [])

  const playMusic = async () => {
    const audio = document.getElementById('our-song')
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false); return }
    try { await audio.play(); setPlaying(true) } catch { setPlaying(false); alert('Song file public/music/our-song.mp3 mein add karo, phir Play dabao.') }
  }

  const onProposal = (i) => {
    setReply(proposalReplies[i])
    burst(75)
  }

  return (
    <div className="app-shell" onClick={(e) => { if (e.target.closest('button')) burst(12) }}>
      <div className="grain" />
      <div className="ambient-glow glow-one" /><div className="ambient-glow glow-two" />
      <div className="heart-layer" aria-hidden="true">
        {hearts.map(h => <motion.div key={h.id} className={`floating-heart ${h.ambient ? 'ambient' : 'burst'}`}
          initial={{ y: '110vh', x: 0, opacity: 0, scale: .5, rotate: -18 }}
          animate={{ y: '-15vh', x: h.drift, opacity: h.ambient ? [.0,.5,.5,0] : [0,1,1,0], scale: [h.ambient ? .6 : .4, 1, .8], rotate: 18 }}
          transition={{ duration: h.duration, delay: h.delay, ease: 'easeOut' }}
          style={{ left: `${h.left}%`, fontSize: h.size }}>♥</motion.div>)}
      </div>

      <nav className="topbar"><a href="#home" className="brand">V <span>♥</span> A</a><a href="#forever" className="nav-link">Our forever</a></nav>

      <main>
        <section className="hero section" id="home">
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}>
            <Sparkles size={14}/> A little universe made only for you
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .35 }}>
            Welcome to the world<br/><em>where you are my everything</em>
          </motion.h1>
          <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }}>
            For my Alka, from your Vinayak — with all the love I have.
          </motion.p>
          <motion.div className="hero-heart" animate={{ scale: [1, 1.12, 1], filter: ['drop-shadow(0 0 12px #ff477e)', 'drop-shadow(0 0 32px #ff477e)', 'drop-shadow(0 0 12px #ff477e)'] }} transition={{ duration: 2.2, repeat: Infinity }}>
            <Heart fill="currentColor" strokeWidth={0}/>
          </motion.div>
          <button className="primary-btn" onClick={() => { burst(65); document.getElementById('letter').scrollIntoView({ behavior: 'smooth' }) }}>Open my heart <Heart size={16} fill="currentColor"/></button>
          <div className="scroll-hint"><ArrowDown size={14}/> scroll slowly, meri jaan</div>
        </section>

        <section className="section letter-section" id="letter">
          <div className="section-kicker">A letter from my heart</div>
          <h2>Alka, ek baat kahun? <em>Sunogi na?</em></h2>
          <motion.div className="letter-card" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="letter-top"><span>MY DEAREST ALKA</span><Heart size={18} fill="currentColor"/></div>
            <p>Meri pyaari Alka,</p>
            <p>Tum na sach mein meri life ka sabse pyaara hissa ho. Kabhi itni cute lagti ho ki bas dekhta rahun, aur kabhi itne nakhre karti ho ki mann karta hai tumhe aur tang karun. 😌❤️ Par sach kahun? Tumhare ye nakhre, tumhari hasi, tumhari baatein — sab kuch mujhe bahut apna lagta hai.</p>
            <p>Hum pehle se ek doosre ko jaante the, lekin tumhare aur kareeb aana, tumhe aur samajhna, aur tumhare saath itna special connection feel karna… mere liye ye sabse khoobsurat ehsaas hai. Tumhare paas aakar dil ko ek alag hi sukoon milta hai.</p>
            <p>Main perfect nahi hoon. Kabhi bachchon jaisi harkatein karunga, kabhi tumhe jaan-boojhkar chidhाऊंगा, kabhi bina wajah tumse attention maangunga. Lekin ek baat hamesha yaad rakhna — mera pyaar tumhare liye bilkul sachcha hai. Main tumhe sirf achhe dinon mein nahi, har mood, har mushkil aur har badalte waqt mein choose karna chahta hoon.</p>
            <p>Main kisi aur jaisa banna nahi chahta. Main bas tumhara Vinayak bankar rehna chahta hoon — jo tumhe hasaaye, tumhari care kare, tumhare sapnon mein tumhara saathi bane aur har roz tumhe feel karwaaye ki tum kitni special ho.</p>
            <p className="letter-sign">Tumhara hi, har baar aur har haal mein,<br/><strong>Vinayak</strong> <Heart size={15} fill="currentColor"/></p>
            <button className="text-btn" onClick={() => { setLetterOpen(!letterOpen); burst(20) }}>{letterOpen ? 'Close this little secret' : 'Ek aur baat, sirf tumhare liye'} <span>♥</span></button>
            <AnimatePresence>{letterOpen && <motion.div className="secret-note" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              Agar kabhi tumhe lage ki tum kitni special ho, toh bas yaad karna: iss duniya mein ek pagal sa ladka hai jo tumhari ek smile ke liye kuch bhi kar sakta hai. Aur haan, us ladke ko thoda tang karna allowed hai… par pyaar se. 😉
            </motion.div>}</AnimatePresence>
          </motion.div>
        </section>

        <section className="section memories-section" id="memories">
          <div className="section-kicker">Little pieces of us</div>
          <h2>Our moments, <em>our memories.</em></h2>
          <p className="section-intro">Yahan apni photos add karna — har tasveer ke saath ek apni kahaani hai.</p>
          <div className="photo-grid">
            {gallery.map((p, i) => <motion.div className="photo-card" key={p.src} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .07 }}>
              <div className="photo-frame"><img src={p.src} alt={`Our memory ${i+1}`} onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.classList.add('photo-placeholder') }}/><div className="placeholder-content"><Images size={28}/><span>YOUR PHOTO {i+1}</span><small>public/photos/{PHOTO_FILES[i]}</small></div></div>
              <p>{p.caption}</p>
            </motion.div>)}
          </div>
        </section>

        <section className="section reasons-section">
          <div className="section-kicker">A thousand little reasons</div>
          <h2>Why I keep <em>choosing you.</em></h2>
          <motion.div className="reason-card" key={reason} initial={{ opacity: 0, scale: .96, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
            <span className="reason-number">0{reason + 1} / 06</span><Heart size={30} fill="currentColor"/>
            <p>{reasons[reason]}</p>
            <button className="outline-btn" onClick={() => { setReason((reason + 1) % reasons.length); burst(28) }}>Aur ek reason batao <Sparkles size={15}/></button>
          </motion.div>
        </section>

        <section className="section closeness-section">
          <div className="section-kicker">The beautiful part is us</div>
          <h2>Humara ek doosre ke <em>kareeb aana.</em></h2>
          <div className="quote-panel">
            <div className="quote-mark">“</div>
            <p>Hum pehle se ek doosre ko jaante the, par dheere-dheere tum meri zindagi ka woh hissa ban gayi jiske bina ab kuch bhi poora nahi lagta. Tumhare kareeb aana, tumhe samajhna, tumhara mere itne apne ho jaana — mere liye ye sabse khoobsurat ehsaas hai.</p>
            <span>— Vinayak, tumhara</span>
          </div>
        </section>

        <section className="section music-section">
          <div className="section-kicker">Our little soundtrack</div>
          <h2>Press play, <em>think of us.</em></h2>
          <div className="music-card">
            <div className="vinyl" style={{ animationPlayState: playing ? 'running' : 'paused' }}><div className="vinyl-center"><Heart fill="currentColor" size={22}/></div></div>
            <div className="music-meta"><span>JUST FOR YOU</span><strong>Our song, our feeling</strong><small>Ek gaana, hazaar yaadein.</small></div>
            <button className="play-btn" onClick={playMusic}>{playing ? <Pause fill="currentColor"/> : <Play fill="currentColor"/>}</button>
            <audio id="our-song" src={SONG_FILE} loop onEnded={() => setPlaying(false)} onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)}/>
          </div>
          <p className="tiny-note">Apna song <code>public/music/our-song.mp3</code> naam se add karna.</p>
        </section>

        <section className="section surprise-section">
          <div className="section-kicker">Psst… one more thing</div>
          <h2>Ek chhota sa <em>surprise.</em></h2>
          <div className="surprise-box">
            <LockKeyhole size={27}/>
            <p>Isse tabhi kholna jab tumhe extra pyaar chahiye ho.</p>
            <button className="primary-btn" onClick={() => { setSecretOpen(!secretOpen); burst(55) }}>{secretOpen ? 'Secret band karo' : 'Open your surprise'} <Sparkles size={16}/></button>
            <AnimatePresence>{secretOpen && <motion.div className="surprise-message" initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .85 }}>
              <div className="big-heart">♥</div>
              <h3>Alka, you are my favourite notification, my safest place and my happiest thought.</h3>
              <p>Yr literally I love U my Love , aur mujhe apke sath har pal jeena h, har ek pal jitni possibilities h is duniya mai 🥺</p>
            </motion.div>}</AnimatePresence>
          </div>
        </section>

        <section className="section future-section">
          <div className="section-kicker">A promise, not just words</div>
          <h2>In every tomorrow, <em>I want us.</em></h2>
          <div className="future-list">
            <div><span>01</span><p>Tumhari khushi mein dil se khush hona.</p></div>
            <div><span>02</span><p>Mushkil waqt mein tumhara haath aur mazbooti se pakadna.</p></div>
            <div><span>03</span><p>Chhoti-chhoti baaton par hasna, thoda ladna, phir aur zyada pyaar karna.</p></div>
            <div><span>04</span><p>Har naye din tumhe phir se choose karna.</p></div>
          </div>
        </section>

        <section className="section proposal-section" id="forever">
          <div className="proposal-stars"><Stars/><Stars/><Stars/></div>
          <div className="section-kicker">One question, from the bottom of my heart</div>
          <h2>Alka, kya tum meri bankar<br/><em>puri life, aakhri saans tak…</em></h2>
          <p className="proposal-question">is janam mein mera haath thaam kar mere saath rahogi?</p>
          <p className="proposal-sub">Main har din tumhe choose karne, tumhari care karne aur tumse beintehaa pyaar karne ka vaada karta hoon.</p>
          <div className="answer-options">
            {['Haan, meri jaan ❤️', 'Bilkul, lifetime ke liye 💗', 'Haan ji, par mujhe tang karne ki permission ke saath 😘', 'Tumse hi toh rehna hai, pagal! 🥹', 'Ek baar nahi, har janam haan! 💞'].map((label, i) =>
              <button className="answer-btn" key={label} onClick={() => onProposal(i)}>{label}</button>
            )}
          </div>
          <AnimatePresence>{reply && <motion.div className="answer-reply" initial={{ opacity: 0, y: 18, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
            <Heart fill="currentColor"/><p>{reply}</p><span>— Forever yours, Vinayak</span>
          </motion.div>}</AnimatePresence>
          <div className="forever-stamp">V <Heart fill="currentColor" size={19}/> A</div>
          <p className="final-line">Aaj bhi tum. Kal bhi tum. Har baar sirf tum.</p>
        </section>
      </main>
      <footer>Made with a little madness & a whole lot of love <Heart size={13} fill="currentColor"/> by Vinayak, for Alka.</footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
