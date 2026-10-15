import React,{memo,useEffect,useState} from 'react';
import {AccessibilityInfo,AppState,Pressable,StyleSheet,Text,View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {movementSvg} from './movement';
const words={
en:['MOVEMENT DEMO','Male','Female','Pause animation','Play animation','Slow motion','Normal speed','Illustrated movement guide. Move at your own comfortable pace.'],
ar:['عرض الحركة','رجل','امرأة','إيقاف الحركة','تشغيل الحركة','حركة بطيئة','سرعة عادية','دليل حركة توضيحي. تحرك بالسرعة المريحة لك.'],
ur:['حرکت کا نمونہ','مرد','عورت','حرکت روکیں','حرکت چلائیں','آہستہ حرکت','معمول کی رفتار','حرکت کی تصویری رہنمائی۔ اپنی آرام دہ رفتار سے ورزش کریں۔'],
hi:['गतिविधि का उदाहरण','पुरुष','महिला','एनिमेशन रोकें','एनिमेशन चलाएँ','धीमी गति','सामान्य गति','चित्रित गतिविधि मार्गदर्शिका। अपनी आरामदायक गति से करें।'],
es:['DEMOSTRACIÓN','Hombre','Mujer','Pausar animación','Reproducir animación','Cámara lenta','Velocidad normal','Guía ilustrada. Muévete a tu propio ritmo cómodo.'],
ru:['ПОКАЗ ДВИЖЕНИЯ','Мужчина','Женщина','Пауза анимации','Запустить анимацию','Медленно','Обычная скорость','Иллюстрация движения. Двигайтесь в удобном темпе.'],
fr:['DÉMONSTRATION','Homme','Femme','Pause animation','Lancer animation','Ralenti','Vitesse normale','Guide illustré. Bougez à votre rythme, sans inconfort.']};
function ExerciseDemo({exerciseId,lang='en',active=true,compact=false}){
 const [phase,setPhase]=useState(0),[playing,setPlaying]=useState(true),[slow,setSlow]=useState(false),[foreground,setForeground]=useState(AppState.currentState!=='background');
 const w=words[lang]||words.en;
 useEffect(()=>{let mounted=true;AccessibilityInfo.isReduceMotionEnabled().then(reduced=>{if(mounted&&reduced)setPlaying(false);});const motion=AccessibilityInfo.addEventListener('reduceMotionChanged',reduced=>{if(reduced)setPlaying(false);});const app=AppState.addEventListener('change',state=>setForeground(state==='active'));return()=>{mounted=false;motion.remove();app.remove();};},[]);
 useEffect(()=>{if(!playing||!active||!foreground)return;let last=Date.now();const timer=setInterval(()=>{const now=Date.now(),elapsed=Math.min(100,now-last);last=now;setPhase(p=>(p+elapsed/(slow?8000:4000))%1);},65);return()=>clearInterval(timer);},[playing,active,foreground,slow]);
 return <View style={styles.card} testID={`demo-${exerciseId}`}>
  <Text style={styles.heading}>{w[0]}</Text>
  <SvgXml xml={movementSvg(exerciseId,phase)} width="100%" height={compact?190:222} accessible accessibilityLabel={`${w[0]}: ${exerciseId}, ${w[1]}, ${w[2]}`}/>
  <View style={styles.names}><Text style={[styles.name,{color:'#b6ef61'}]}>{w[1]}</Text><Text style={[styles.name,{color:'#c2a3ff'}]}>{w[2]}</Text></View>
  <View style={styles.controls}><Pressable accessibilityRole="button" accessibilityLabel={playing?w[3]:w[4]} onPress={()=>setPlaying(v=>!v)} style={styles.control}><Text style={styles.controlText}>{playing?'Ⅱ':'▶'} {playing?w[3]:w[4]}</Text></Pressable><Pressable accessibilityRole="button" accessibilityLabel={slow?w[6]:w[5]} accessibilityState={{selected:slow}} onPress={()=>setSlow(v=>!v)} style={[styles.control,slow&&{borderColor:'#b6ef61'}]}><Text style={styles.controlText}>{slow?'0.5×':'1×'} · {slow?w[6]:w[5]}</Text></Pressable></View>
  {!active&&<Text style={styles.caption}>{lang==='en'?'Animation paused with your workout.':w[3]}</Text>}
  <Text style={styles.caption}>{w[7]}</Text>
 </View>;
}
export default memo(ExerciseDemo);
const styles=StyleSheet.create({card:{width:'100%',backgroundColor:'#101b17',borderWidth:1,borderColor:'#2b4034',borderRadius:20,padding:12,marginVertical:8},heading:{color:'#98ad9f',fontSize:9,fontWeight:'800',letterSpacing:2,marginBottom:0},names:{flexDirection:'row',marginTop:-8,marginBottom:12},name:{flex:1,textAlign:'center',fontSize:12,fontWeight:'700'},controls:{flexDirection:'row',gap:8,flexWrap:'wrap'},control:{flexGrow:1,minHeight:44,alignItems:'center',justifyContent:'center',padding:8,borderWidth:1,borderColor:'#344b3c',borderRadius:12,backgroundColor:'#19291f'},controlText:{color:'#dfebdf',fontSize:11,fontWeight:'600'},caption:{color:'#96aa9c',fontSize:10,lineHeight:17,marginTop:10,textAlign:'center'}});
