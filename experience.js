const story=document.querySelector('.machine-story'),stage=document.querySelector('.story-sticky'),anatomy=document.querySelector('.anatomy');
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),mobileStory=matchMedia('(max-width:760px)');
const scenes=[{kicker:'01 — THE POWER',title:'More than metal.<br><span>A skill to build on.</span>',description:'Behind every movement is an operator. Discover the machine, then explore where training could take you.',caption:'THE OUTLINE OF A NEW DIRECTION'}, {kicker:'02 — THE PRECISION',title:'Every movement.<br><span>Starts with you.</span>',description:'The boom. The cab. The tracks. Tap the markers to take a closer look at the parts that work together.',caption:'TAP A MARKER TO EXPLORE THE MACHINE'}, {kicker:'03 — THE POSSIBILITY',title:'See the machine.<br><span>Picture your next step.</span>',description:'Excavator training is advertised at $170, with two-week training and free food and accommodation. Ask Haven about the next intake.',caption:'EXCAVATOR TRAINING / ADVERTISED FEE $170'}];
let currentScene=-1;
function setScene(n,wipe){const s=scenes[n];stage.dataset.stage=String(n);document.querySelectorAll('.part-hotspot').forEach(b=>{b.disabled=n!==1;b.tabIndex=n===1?0:-1});anatomy.style.setProperty('--wipe',`${wipe??(n===0?0:100)}%`);anatomy.style.setProperty('--outline',String(n===0?1:0));if(n===currentScene)return;currentScene=n;document.querySelector('#story-kicker').textContent=s.kicker;document.querySelector('#story-title').innerHTML=s.title;document.querySelector('#story-description').textContent=s.description;document.querySelector('#part-caption').textContent=s.caption;document.querySelectorAll('[data-scene]').forEach(b=>{const active=Number(b.dataset.scene)===n;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});document.querySelectorAll('.part-hotspot').forEach(b=>b.classList.remove('active'));}
let queued=false;
function updateStory(){queued=false;const rect=story.getBoundingClientRect();if(!mobileStory.matches&&!reduced.matches){const progress=Math.max(0,Math.min(1,-rect.top/(story.offsetHeight-innerHeight)));const n=progress<.28?0:progress<.7?1:2;setScene(n,Math.min(100,Math.max(0,(progress-.13)/.25*100)));anatomy.style.setProperty('--draw',String(Math.max(0,1-progress/.17)*900));}const hero=document.querySelector('.cinema-hero'),world=document.querySelector('.cinema-world');if(!reduced.matches&&!mobileStory.matches){const y=Math.min(innerHeight,Math.max(0,-hero.getBoundingClientRect().top));world.style.transform=`translateY(${y*.14}px)`;}}
addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(updateStory)}},{passive:true});addEventListener('resize',updateStory);
document.querySelectorAll('[data-scene]').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.scene);if(mobileStory.matches||reduced.matches)setScene(n);else{const fractions=[.05,.46,.86];scrollTo({top:story.getBoundingClientRect().top+scrollY+(story.offsetHeight-innerHeight)*fractions[n],behavior:'smooth'})}}));
const parts={boom:'BOOM & BUCKET / REACH, DIG AND MOVE MATERIAL',cab:'OPERATOR’S CAB / THE MACHINE’S CONTROL POSITION',tracks:'TRACKS / SUPPORT AND MOVEMENT OVER THE GROUND'};
document.querySelectorAll('.part-hotspot').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.part-hotspot').forEach(t=>{t.classList.toggle('active',t===b);t.setAttribute('aria-pressed',String(t===b))});anatomy.dataset.part=b.dataset.part;document.querySelector('#part-caption').textContent=parts[b.dataset.part]}));
document.querySelector('#story-action').addEventListener('click',()=>{filter='all';document.querySelectorAll('[data-filter]').forEach(b=>{const active=b.dataset.filter==='all';b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});choose(1)});
setScene(reduced.matches?1:0);updateStory();

// A single camera push into the steelwork, with an intentional resting frame.
const filmHero=document.querySelector('.cinema-hero'),filmImage=document.querySelector('.cinema-world img');
const motionButton=document.createElement('button');motionButton.className='hero-motion';motionButton.type='button';motionButton.textContent='Ⅱ  Pause motion';motionButton.setAttribute('aria-label','Pause hero image zoom');filmHero.append(motionButton);
let cameraMove=null,userPaused=false;
function createCameraMove(){
 cameraMove?.cancel();
 if(reduced.matches){motionButton.hidden=true;filmHero.dataset.motion='still';return}
 motionButton.hidden=false;userPaused=false;filmHero.dataset.motion='playing';motionButton.textContent='Ⅱ  Pause motion';motionButton.setAttribute('aria-label','Pause hero image zoom');
 const small=mobileStory.matches;
 cameraMove=filmImage.animate([{transform:`scale(${small?1:1.025})`},{transform:`scale(${small?1.075:1.16})`}],{duration:small?8500:10000,easing:'cubic-bezier(.16,.4,.3,1)',fill:'forwards'});
 cameraMove.onfinish=()=>{filmHero.dataset.motion='finished';motionButton.textContent='↻  Replay motion';motionButton.setAttribute('aria-label','Replay hero image zoom')};
}
motionButton.addEventListener('click',()=>{
 if(!cameraMove||cameraMove.playState==='finished'){createCameraMove();return}
 userPaused=!userPaused;
 if(userPaused){cameraMove.pause();filmHero.dataset.motion='paused';motionButton.textContent='▷  Resume motion';motionButton.setAttribute('aria-label','Resume hero image zoom')}
 else{cameraMove.play();filmHero.dataset.motion='playing';motionButton.textContent='Ⅱ  Pause motion';motionButton.setAttribute('aria-label','Pause hero image zoom')}
});
new IntersectionObserver(([entry])=>{if(!cameraMove||userPaused||cameraMove.playState==='finished')return;if(entry.isIntersecting&&!document.hidden)cameraMove.play();else cameraMove.pause()},{threshold:.08}).observe(filmHero);
document.addEventListener('visibilitychange',()=>{if(!cameraMove||userPaused||cameraMove.playState==='finished')return;if(document.hidden)cameraMove.pause();else if(filmHero.getBoundingClientRect().bottom>0)cameraMove.play()});
reduced.addEventListener('change',createCameraMove);createCameraMove();
