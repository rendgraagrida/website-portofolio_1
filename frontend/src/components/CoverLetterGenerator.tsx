import React, { useState, useEffect } from 'react';
import { ui } from '../i18n/ui';
import { personalProfile } from '../data/resume';
import { Sparkles, Copy, Check, Download, Printer, FileText, Building, UserCheck } from 'lucide-react';

interface CoverLetterProps {
  lang: 'id' | 'en';
}

type FocusArea = 'devops' | 'database' | 'automation' | 'techlead' | 'fullstack';

export const CoverLetterGenerator: React.FC<CoverLetterProps> = ({ lang }) => {
  const t = ui[lang];
  const [company, setCompany] = useState('PT Bank Mandiri (Persero) Tbk');
  const [role, setRole] = useState('Senior DevOps / Database Specialist');
  const [focus, setFocus] = useState<FocusArea>('devops');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLetterText = (targetCompany: string, targetRole: string, focusArea: FocusArea, language: 'id' | 'en') => {
    const comp = targetCompany.trim() || (language === 'id' ? '[Nama Perusahaan]' : '[Company Name]');
    const pos = targetRole.trim() || (language === 'id' ? '[Posisi Target]' : '[Target Position]');
    const currentDate = new Date().toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    if (language === 'id') {
      let focusParagraph = '';
      if (focusArea === 'database') {
        focusParagraph = `Dengan pengalaman lebih dari 8 tahun di PT. Sigma Cipta Caraka (Telkomsigma), saya terbiasa mengelola dan mengoptimalkan lingkungan Oracle Database dan Oracle Siebel CRM skala enterprise. Saya bertanggung jawab atas pemeliharaan database, tuning query SQL berkinerja tinggi, replikasi data, validasi lintas platform (seperti IndiHome & Telkomsel), serta prosedur backup & disaster recovery dengan zero fatal downtime.`;
      } else if (focusArea === 'automation') {
        focusParagraph = `Keahlian utama saya terletak pada pemanfaatan Python dan Shell Scripting untuk mentransformasi tugas-tugas operasional manual menjadi pipeline otomatis yang terstandardisasi. Di PT. Putra Sejati Indomakmur dan Telkomsigma, saya memelopori otomatisasi ekstraksi data DAU, pembersihan, dan pelaporan yang menghemat ratusan jam kerja tim serta mengeliminasi human error secara drastis.`;
      } else if (focusArea === 'techlead') {
        focusParagraph = `Sebagai Tech Lead di Telkomsigma, saya memimpin koordinasi arsitektur IT lintas divisi, menerjemahkan kebutuhan bisnis yang kompleks menjadi dokumen teknis yang terstruktur, dan membimbing tim engineer untuk mencapai delivery proyek yang tepat waktu dan memenuhi standar IT Governance enterprise.`;
      } else {
        focusParagraph = `Selama lebih dari 8 tahun berkarir di Telkomsigma dan industri terkait, saya telah membangun keahlian end-to-end dalam DevOps CI/CD, administrasi server Linux, otomatisasi scripting Python/Bash, serta pengelolaan database skala enterprise. Saya terbiasa memastikan ketersediaan sistem kritikal dengan uptime maksimal serta deployment yang terotomatisasi.`;
      }

      return `${currentDate}

Kepada Yth.
Tim Rekrutmen / Hiring Manager
${comp}

Perihal: Lamaran Pekerjaan untuk Posisi ${pos}

Dengan hormat,

Melalui surat ini, saya ingin menyampaikan antusiasme dan ketertarikan saya yang besar untuk bergabung bersama ${comp} sebagai ${pos}. Berbekal lebih dari 8 tahun pengalaman profesional di industri IT skala enterprise—khususnya dalam bidang DevOps, administrasi database, otomatisasi proses data, dan kepemimpinan teknis—saya yakin dapat memberikan kontribusi nyata bagi keandalan infrastruktur dan inovasi teknologi di ${comp}.

${focusParagraph}

Saya sangat mengagumi reputasi ${comp} dan memiliki komitmen tinggi untuk menghadirkan efisiensi operasional, ketahanan sistem, serta budaya rekayasa perangkat lunak yang unggul. Portofolio interaktif dan riwayat proyek lengkap saya dapat diakses langsung melalui link web portofolio: ${typeof window !== 'undefined' ? window.location.origin : 'https://github.com/rendgraagrida/website-portofolio_1'}.

Besar harapan saya untuk mendapatkan kesempatan wawancara guna mendiskusikan lebih lanjut bagaimana keahlian dan rekam jejak saya dapat mendukung pencapaian target strategis ${comp}.

Terima kasih atas waktu dan perhatian yang Bapak/Ibu berikan.

Hormat saya,

Rendgra Agrida
Bandung, Jawa Barat, Indonesia
📞 ${personalProfile.phone}
✉️ ${personalProfile.email}
🔗 ${personalProfile.socials.linkedin}`;
    } else {
      let focusParagraph = '';
      if (focusArea === 'database') {
        focusParagraph = `With over 8 years of hands-on experience at PT. Sigma Cipta Caraka (Telkomsigma), I have specialized in architecting, maintaining, and troubleshooting enterprise-grade Oracle Database and Oracle Siebel CRM environments. My track record includes high-throughput SQL performance tuning, database cloning, and multi-system data reconciliations across critical telecommunication systems with zero fatal downtime.`;
      } else if (focusArea === 'automation') {
        focusParagraph = `My core strength lies in leveraging Python and Bash scripting to transform manual operational tasks into robust, repeatable automated pipelines. At PT. Putra Sejati Indomakmur and Telkomsigma, I engineered data extraction and automated cleansing solutions for Data Acquisition Units, saving hundreds of engineering hours and eliminating manual human error.`;
      } else if (focusArea === 'techlead') {
        focusParagraph = `In my role as Tech Lead at Telkomsigma, I spearheaded cross-divisional technical alignment, translating high-level business goals into precise architectural blueprints and guiding engineering teams toward on-time, high-governance system delivery.`;
      } else {
        focusParagraph = `Throughout my 8+ years in enterprise IT, I have built comprehensive expertise spanning DevOps automation, Linux server administration, Python/Bash scripting, and enterprise database reliability. I excel at architecting CI/CD workflows and ensuring mission-critical system stability.`;
      }

      return `${currentDate}

To:
Hiring Team / Recruitment Committee
${comp}

Subject: Application for ${pos}

Dear Hiring Manager,

I am writing to express my strong enthusiasm and interest in applying for the ${pos} position at ${comp}. With over 8 years of specialized experience in enterprise IT environments—focusing on DevOps engineering, database administration, Python process automation, and technical project leadership—I am confident in my ability to deliver immediate value to ${comp}'s technological operations.

${focusParagraph}

I deeply respect ${comp}'s industry impact and am eager to bring my proactive problem-solving mindset and dedication to system reliability to your team. My verified technical projects and interactive portfolio can be reviewed anytime at: ${typeof window !== 'undefined' ? window.location.origin : 'https://github.com/rendgraagrida/website-portofolio_1'}.

I would welcome the opportunity to discuss in detail how my background and skills align with the goals of ${comp}. Thank you very much for your time and consideration.

Sincerely,

Rendgra Agrida
Bandung, West Java, Indonesia
📞 ${personalProfile.phone}
✉️ ${personalProfile.email}
🔗 ${personalProfile.socials.linkedin}`;
    }
  };

  useEffect(() => {
    setGeneratedLetter(generateLetterText(company, role, focus, lang));
  }, [company, role, focus, lang]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const filename = `Cover_Letter_Rendgra_Agrida_${company.replace(/\s+/g, '_')}.txt`;
    const element = document.createElement('a');
    const file = new Blob([generatedLetter], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Cover Letter - Rendgra Agrida - ${company}</title>
            <style>
              body { font-family: 'Times New Roman', serif; line-height: 1.6; padding: 40px; color: #111; max-width: 800px; margin: auto; font-size: 14px; }
              pre { white-space: pre-wrap; font-family: inherit; }
            </style>
          </head>
          <body>
            <pre>${generatedLetter}</pre>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <section id="cover-letter" className="py-24 bg-brand-cream border-t border-earth-200">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-brown/10 text-brand-brown text-sm font-bold mb-3">
            <Sparkles size={16} />
            <span>{t['coverLetter.badge']}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-3 tracking-tight">
            {t['coverLetter.title']}
          </h2>
          <p className="text-earth-800 text-lg leading-relaxed">
            {t['coverLetter.desc']}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls / Inputs Form (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-earth-200 flex flex-col gap-5">
            <div className="flex items-center gap-2 text-brand-dark font-extrabold pb-3 border-b border-earth-100">
              <Building size={20} className="text-brand-brown" />
              <span>{lang === 'id' ? 'Kustomisasi Sasaran Lamaran' : 'Customize Target Job'}</span>
            </div>

            <div>
              <label htmlFor="target-company" className="block text-sm font-bold text-earth-800 mb-1.5">
                {t['coverLetter.companyLabel']}
              </label>
              <input 
                id="target-company"
                type="text" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={t['coverLetter.companyPlaceholder']}
                className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-earth-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-brown text-earth-900 font-medium transition-all"
              />
            </div>

            <div>
              <label htmlFor="target-role" className="block text-sm font-bold text-earth-800 mb-1.5">
                {t['coverLetter.roleLabel']}
              </label>
              <input 
                id="target-role"
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder={t['coverLetter.rolePlaceholder']}
                className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-earth-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-brown text-earth-900 font-medium transition-all"
              />
            </div>

            <div>
              <label htmlFor="target-focus" className="block text-sm font-bold text-earth-800 mb-1.5">
                {t['coverLetter.focusLabel']}
              </label>
              <select 
                id="target-focus"
                value={focus}
                onChange={(e) => setFocus(e.target.value as FocusArea)}
                className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-earth-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-brown text-earth-900 font-medium transition-all"
              >
                <option value="devops">DevOps, Cloud & Linux Server Admin</option>
                <option value="database">Enterprise Oracle Database & Siebel CRM</option>
                <option value="automation">Python Data Automation & ETL Pipelines</option>
                <option value="techlead">Technical Leadership & IT Governance</option>
                <option value="fullstack">Fullstack Development (Astro / React / Bun)</option>
              </select>
            </div>

            <div className="pt-2 text-xs text-earth-600 bg-earth-100/60 p-3.5 rounded-xl flex items-start gap-2">
              <UserCheck size={16} className="text-brand-brown flex-shrink-0 mt-0.5" />
              <span>
                {lang === 'id' 
                  ? 'Cover letter otomatis ini dirangkai menggunakan data riwayat kerja nyata Anda di Telkomsigma dan PT Putra Sejati Indomakmur.'
                  : 'This tailored cover letter is dynamically formulated using your verified career milestones at Telkomsigma and PSI.'}
              </span>
            </div>
          </div>

          {/* Result Preview Box (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-md border border-earth-200 overflow-hidden flex flex-col">
            {/* Top Toolbar */}
            <div className="bg-earth-100 px-6 py-4 border-b border-earth-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-bold text-brand-dark text-sm">
                <FileText size={18} className="text-brand-brown" />
                <span>{t['coverLetter.previewTitle']}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-brand-brown hover:text-white border border-earth-200 rounded-lg text-xs font-bold text-earth-800 transition-all shadow-sm"
                >
                  {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  <span>{copied ? t['coverLetter.copied'] : t['coverLetter.copyBtn']}</span>
                </button>

                <button
                  onClick={handleDownloadTxt}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-brand-brown hover:text-white border border-earth-200 rounded-lg text-xs font-bold text-earth-800 transition-all shadow-sm"
                  title="Download .TXT"
                >
                  <Download size={14} />
                  <span>{t['coverLetter.downloadTxt']}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brand-brown hover:bg-brand-dark text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                  title="Print PDF"
                >
                  <Printer size={14} />
                  <span>{t['coverLetter.print']}</span>
                </button>
              </div>
            </div>

            {/* Letter Content Preview */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[500px] bg-slate-50/50 font-serif text-earth-900 leading-relaxed text-sm md:text-base selection:bg-brand-brown/20 whitespace-pre-line border-b border-earth-100">
              {generatedLetter}
            </div>

            {/* Footer status */}
            <div className="px-6 py-3 bg-white text-xs text-earth-500 flex justify-between items-center">
              <span>{lang === 'id' ? 'Format Standar Profesional HR & ATS' : 'HR & ATS Compliant Format'}</span>
              <span className="font-semibold text-brand-brown">{company}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
