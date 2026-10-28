import { useEffect, useState } from 'react';
import { getAppliances, createAppliance, updateAppliance, deleteAppliance } from './api.js';

const blank = { name: '', labLocation: '', sampleReading: '', readingUnit: '' };
export default function App() {
  const [items, setItems] = useState([]), [form, setForm] = useState(blank), [edit, setEdit] = useState(null), [error, setError] = useState('');
  const load = () => getAppliances().then(setItems).catch(() => setError('Cannot load appliances. Check the backend URL.'));
  useEffect(() => { load(); }, []);
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const save = async e => { e.preventDefault(); setError(''); try {
    const data = { ...form, sampleReading: form.sampleReading === '' ? null : Number(form.sampleReading) };
    edit ? await updateAppliance(edit, data) : await createAppliance(data);
    setForm(blank); setEdit(null); load();
  } catch (err) { setError(err.response?.data?.message || 'Save failed.'); } };
  const remove = async id => { if (confirm('Delete this appliance?')) { await deleteAppliance(id); load(); } };
  return <main className="shell"><header className="hero"><div className="eyebrow">LAB MANAGEMENT · MANUAL LOGBOOK</div><h1>ApplianceRegister</h1><p>Record appliances and manual sample readings.</p></header>
    {error && <p className="alert error">{error}</p>}<section className="panel"><h2>{edit ? 'Update appliance' : 'Add appliance'}</h2>
    <form onSubmit={save}><div className="form-grid">{[['name','Appliance name *'],['labLocation','Lab location *'],['sampleReading','Sample reading'],['readingUnit','Reading unit']].map(([name,label])=><label key={name}>{label}<input name={name} value={form[name]} onChange={change} required={name==='name'||name==='labLocation'} type={name==='sampleReading'?'number':'text'} step={name==='sampleReading'?'any':undefined}/></label>)}</div>
    <div className="form-footer"><span className="hint">* Required fields</span><button className="button primary">{edit?'Save changes':'Add appliance'}</button></div></form></section>
    <section className="records"><div className="section-heading records-heading"><h2>All appliances · {items.length}</h2><button className="button secondary" onClick={load}>Refresh</button></div>
    <div className="table-wrap"><table><thead><tr><th>Name</th><th>Location</th><th>Reading</th><th>Actions</th></tr></thead><tbody>{items.map(a=><tr key={a.id}><td>{a.name}</td><td>{a.labLocation}</td><td>{a.sampleReading??'—'} {a.readingUnit}</td><td><button className="text-button" onClick={()=>{setEdit(a.id);setForm({name:a.name,labLocation:a.labLocation,sampleReading:a.sampleReading??'',readingUnit:a.readingUnit??''});}}>Edit</button> <button className="text-button danger-text" onClick={()=>remove(a.id)}>Delete</button></td></tr>)}</tbody></table></div></section></main>;
}
