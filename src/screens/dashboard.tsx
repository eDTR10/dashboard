import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Calendar, Search, ArrowRight, ArrowLeft, Clock, FileText, Users, Newspaper, Megaphone, Lock, Unlock, MapPin, Droplets, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"


interface CitizenService {
  id: string
  title: string
  description: string
  procedure: string[]
  processingTime: string
  personResponsible: string[]
}

interface WeatherData {
  temperature: number
  humidity: number
  description: string
  location: string
}

const Dashboard = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedService, setSelectedService] = useState<CitizenService | null>(null)
  const [currentPanel, setCurrentPanel] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isAutoSwipe, setIsAutoSwipe] = useState(true)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const autoSwipeTimer = useRef<NodeJS.Timeout | null>(null)

  // For logo wiggle animation
  const [activeLogo, setActiveLogo] = useState(0)
  const logoCount = 10 // Number of logos in the marquee
  useEffect(() => {
    const logoInterval = setInterval(() => {
      setActiveLogo((prev) => (prev + 1) % logoCount)
    }, 1200)
    return () => clearInterval(logoInterval)
  }, [])

  // Sample YouTube video IDs - replace with your actual videos
  const videoIds = [
    "_PdnRgVc19w",
    "6tM6SfzhcrA",
    "kJQP7kiw5Fk"
  ]

  const events = [
    { date: "Feb 1, 2026", title: "Team Meeting", time: "10:00 AM" },
    { date: "Feb 3, 2026", title: "Project Review", time: "2:00 PM" },
    { date: "Feb 5, 2026", title: "Client Presentation", time: "11:30 AM" },
    { date: "Feb 8, 2026", title: "Workshop", time: "3:00 PM" },
    { date: "Feb 10, 2026", title: "Department Sync", time: "9:00 AM" },
  ]

  const news = [
    {
      date: "Jan 20, 2026",
      title: "eGovPH Update",
      category: "Technology",
      postUrl: "https://www.facebook.com/DICTRegion10/posts/pfbid02Xw3fy4yLPGAfVja9t9v77xYrumbQVrcQvruZfSXyMxbDDLvBSwfyAw32B8854MkPl"
    },
    {
      date: "Jan 28, 2026",
      title: "DICT Announces Free Training Programs",
      category: "Education",
      postUrl: "https://www.facebook.com/DICTRegion10/posts/pfbid0259kWuHjiLx8DLxdw3fo7MgqRNqmnt1pwdKtQcnSRMt2qCk9YekXwKE8P6VaJ2cJEl"
    },
    {
      date: "Jan 25, 2026",
      title: "Cybersecurity Awareness Campaign",
      category: "Security",
      postUrl: "https://www.facebook.com/DICTRegion10/posts/pfbid02G45UmyHuSeTTEE3FE4u1EwVz7rwqmx3RsUSfFtTPAXoeK7m6YNXAK7tAkyidytBTl"
    },
    {
      date: "Jan 22, 2026",
      title: "Free WiFi Expansion Project",
      category: "Infrastructure",
      postUrl: "https://www.facebook.com/DICTRegion10/posts/pfbid02G45UmyHuSeTTEE3FE4u1EwVz7rwqmx3RsUSfFtTPAXoeK7m6YNXAK7tAkyidytBTl"
    },
  ]

  const announcements = [
    { date: "Jan 30, 2026", title: "Office Closure for National Holiday", priority: "High" },
    { date: "Jan 29, 2026", title: "System Maintenance Scheduled", priority: "Medium" },
    { date: "Jan 27, 2026", title: "New Service Window Hours", priority: "Low" },
  ]

  const totalPanels = 3

  const citizenItems: CitizenService[] = [
    {
      id: "1",
      title: "Application for Digital Certificates",
      description: "Processing of applications for digital certificates for secure electronic transactions.",
      procedure: [
        "Register via the Online Registration System (ORS) and submit all requirements.",
        "Request for digital certificates.",
        "Download and install digital certificates."
      ],
      processingTime: "7 days",
      personResponsible: [
        "Registration Authority Officer (RAO)",
        "Digital Certificate Division (PNPKI) Support Team / Assigned Personnel"
      ]
    },
    {
      id: "2",
      title: "Processing of Application to Take the ICT Diagnostic Examination",
      description: "Acceptance and processing of applications to take the ICT Diagnostic Examination.",
      procedure: [
        "Accomplish the ILCDB Online Registration Form.",
        "Receive confirmation accepting the registration form."
      ],
      processingTime: "10 minutes",
      personResponsible: [
        "Training Specialist II – ILCDB"
      ]
    },
    {
      id: "3",
      title: "Issuance of Verified ICT Diagnostic Examination Results",
      description: "Release of verified results for the ICT Diagnostic Examination.",
      procedure: [
        "Request for verification of ICT Diagnostic Examination results.",
        "Validation of examination records.",
        "Release of verified examination results."
      ],
      processingTime: "As indicated by ILCDB",
      personResponsible: [
        "Training Specialist II – ILCDB"
      ]
    },
    {
      id: "4",
      title: "Processing of Application to Take the ICT Proficiency Hands-On Examination",
      description: "Acceptance and processing of applications to take the ICT Proficiency Hands-On Examination.",
      procedure: [
        "Accomplish the ICT Proficiency Hands-On Examination application form.",
        "Receive confirmation and schedule of examination."
      ],
      processingTime: "As scheduled",
      personResponsible: [
        "Training Specialist II – ILCDB"
      ]
    },
    {
      id: "5",
      title: "Issuance of ICT Proficiency Hands-On Examination Results",
      description: "Release of results for the ICT Proficiency Hands-On Examination.",
      procedure: [
        "Validation of examination results.",
        "Issuance of official results to the applicant."
      ],
      processingTime: "As indicated by ILCDB",
      personResponsible: [
        "Training Specialist II – ILCDB"
      ]
    },
    {
      id: "6",
      title: "Processing of Request for ICT Technical Assistance and Services",
      description: "Handling and processing of requests for ICT technical assistance and related services.",
      procedure: [
        "Submit request for ICT technical assistance.",
        "Evaluation of request.",
        "Provision of technical assistance or service."
      ],
      processingTime: "Depends on request complexity",
      personResponsible: [
        "Assigned ICT Technical Personnel"
      ]
    }
  ]

  const filteredServices = citizenItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://weather-api167.p.rapidapi.com/api/weather/current',
          params: {
            lon: import.meta.env.VITE_WEATHER_LON || '124.629684',
            lat: import.meta.env.VITE_WEATHER_LAT || '8.4866927',
            zip: import.meta.env.VITE_WEATHER_ZIP || '9000'
          },
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
            'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST || 'weather-api167.p.rapidapi.com',
            'Accept': 'application/json'
          }
        }
        const response = await axios.request(options)
        if (response.data) {
          const tempInCelsius = response.data.main?.temprature
            ? Math.round(response.data.main.temprature - 273.15)
            : 24

          setWeather({
            temperature: tempInCelsius,
            humidity: response.data.main?.humidity || 65,
            description: response.data.weather?.[0]?.description || 'Partly Cloudy',
            location: response.data.name || 'Unknown'
          })
        }
      } catch (error) {
        console.error('Weather API error:', error)
        setWeather({
          temperature: 24,
          humidity: 65,
          description: 'Partly Cloudy',
          location: 'Cagayan de Oro'
        })
      }
    }

    fetchWeather()
    const weatherInterval = setInterval(fetchWeather, 600000)
    return () => clearInterval(weatherInterval)
  }, [])

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Auto-swipe functionality
  useEffect(() => {
    if (isAutoSwipe) {
      autoSwipeTimer.current = setInterval(() => {
        setCurrentPanel((prev) => (prev + 1) % totalPanels)
      }, 5000)
    } else {
      if (autoSwipeTimer.current) {
        clearInterval(autoSwipeTimer.current)
      }
    }

    return () => {
      if (autoSwipeTimer.current) {
        clearInterval(autoSwipeTimer.current)
      }
    }
  }, [isAutoSwipe, totalPanels])

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videoIds.length)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videoIds.length) % videoIds.length)
  }

  const handleSearch = () => {
    console.log("Searching for:", searchQuery)
  }

  const handleServiceClick = (service: CitizenService) => {
    setSelectedService(service)
  }

  const handleBackToList = () => {
    setSelectedService(null)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setCurrentPanel(1)
    }
    if (touchStart - touchEnd < -75) {
      setCurrentPanel(0)
    }
  }

  const nextPanel = () => {
    setCurrentPanel((prev) => (prev + 1) % totalPanels)
  }

  const prevPanel = () => {
    setCurrentPanel((prev) => (prev - 1 + totalPanels) % totalPanels)
  }

  const toggleAutoSwipe = () => {
    setIsAutoSwipe((prev) => !prev)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }



  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* DICT Projects Marquee */}
      <div className="w-full bg-white/80 py-3 px-2 flex items-center justify-center shadow-md mb-4 animate-fade-in-down">
        <div className="flex items-center justify-center gap-16 w-full max-w-6xl mx-auto">
          <img src="/src/assets/eGovPH Logo.png" alt="eGov PH" className={`h-10 object-contain transition-transform duration-300 ${activeLogo === 0 ? 'animate-wiggle' : ''}`} />
          <img src="/src/assets/eLGU Logo.png" alt="eLGU" className={`h-10 object-contain transition-transform duration-300 ${activeLogo === 1 ? 'animate-wiggle' : ''}`} />
          <img src="/src/assets/lakip.png" alt="Lakip" className={`h-10 object-contain transition-transform duration-300 ${activeLogo === 2 ? 'animate-wiggle' : ''}`} />
          <img src="/src/assets/Free WiFi.png" alt="Free WiFi For All" className={`h-20 object-contain transition-transform duration-300 ${activeLogo === 3 ? 'animate-wiggle' : ''}`} />
          <img src="/src/assets/iidb.png" alt="IIDB" className={`h-10 object-contain transition-transform duration-300 ${activeLogo === 4 ? 'animate-wiggle' : ''}`} />
          <img src="/src/assets/ilcdb.png" alt="ILCDB" className={`h-10 object-contain transition-transform duration-300 ${activeLogo === 5 ? 'animate-wiggle' : ''}`} />
          <img src="/src/assets/cyber-sec.png" alt="Cybersecurity" className={`h-20 object-contain transition-transform duration-300 ${activeLogo === 6 ? 'animate-wiggle' : ''}`} />
          <img src="/src/assets/nbp.png" alt="National Broadband Plan" className={`h-10 object-contain transition-transform duration-300 ${activeLogo === 7 ? 'animate-wiggle' : ''}`} />
          <img src="/src/assets/PNPKI.jpg" alt="Philippine National PKI" className={`h-20 object-contain transition-transform duration-300 ${activeLogo === 8 ? 'animate-wiggle' : ''}`} />
          <img src="/src/assets/NIPPSB.png" alt="ICT Planning, Policy and Standards" className={`h-20 object-contain transition-transform duration-300 ${activeLogo === 9 ? 'animate-wiggle' : ''}`} />
        </div>
      </div>
      <div className="h-full w-full flex gap-5 p-5">
        {/* Left Side - Citizen Charter */}
        <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-100/50 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Header with Gradient Background */}
            <div className="bg-gradient-to-br from-sky-400 to-blue-600 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    {selectedService ? selectedService.title : 'Citizen Charter'}
                  </h1>
                  {!selectedService && (
                    <p className="text-blue-100 text-sm">Browse available government services</p>
                  )}
                </div>
              </div>

              {!selectedService && (
                <div className="relative">
                  <Search className="absolute z-30 left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                  <Input
                    type="text"
                    placeholder="Search services by name or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full h-12 pl-12 pr-4 text-base bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-white/50 rounded-xl shadow-lg placeholder:text-blue-300"
                  />
                </div>
              )}
            </div>

            {!selectedService ? (
              <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
                {/* External Services List */}
                <div className="mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2 mb-2 text-blue-800">
                    <span role="img" aria-label="pin">📌</span>
                    LIST OF ALL EXTERNAL SERVICES
                  </h2>
                </div>
                <div className="space-y-3">
                  {filteredServices.length > 0 ? (
                    filteredServices.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => handleServiceClick(item)}
                        className="w-full group bg-gradient-to-r from-white to-blue-50/50 p-5 rounded-xl border border-blue-100 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-between overflow-hidden relative"
                        style={{
                          animation: `slideInLeft 0.5s ease-out ${index * 0.05}s both`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="text-left relative z-10">
                          <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                        </div>
                        <div className="relative z-10 flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-blue-500 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-12 h-12 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">No services found</h3>
                      <p className="text-sm text-slate-500">Try adjusting your search terms or browse all services</p>
                    </div>
                  )}
                </div>
                {/* Feedback and Complaints Mechanism */}
                <div className="mt-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-xl shadow p-6">
                  <h2 className="text-xl font-bold text-yellow-800 mb-2 flex items-center gap-2">
                    <span role="img" aria-label="pin">📌</span>
                    FEEDBACK AND COMPLAINTS MECHANISM
                  </h2>
                  <div className="flex items-center gap-2 mb-2">
                    <Megaphone className="w-5 h-5 text-yellow-600" />
                    <span className="text-yellow-700 font-semibold">Feedback and Complaints Mechanism</span>
                  </div>
                  <div className="text-slate-700 text-sm space-y-3">
                    <div>
                      <span className="font-semibold text-yellow-700">How to Send Feedback:</span>
                      <ul className="list-disc ml-6 mt-1 space-y-1">
                        <li>Accomplish the Feedback Form available in DICT offices and drop it at the Public Assistance and Complaints Desk</li>
                        <li>Send feedback via email: <a href="mailto:feedback@dict.gov.ph" className="text-blue-700 underline">feedback@dict.gov.ph</a>, <a href="mailto:consumer.protection@dict.gov.ph" className="text-blue-700 underline">consumer.protection@dict.gov.ph</a></li>
                        <li>You may also talk to the Officer of the Day</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-semibold text-yellow-700">How Feedback Is Processed:</span>
                      <ol className="list-decimal ml-6 mt-1 space-y-1">
                        <li>Client submits feedback through the Feedback Form or via email.</li>
                        <li>The Officer of the Day records, reviews, and forwards the feedback to the appropriate Service/Unit.</li>
                        <li>All feedback is submitted to the Committee on Anti-Red Tape (CART) Secretariat.</li>
                        <li>Proper acknowledgment is issued within fifteen (15) days upon receipt.</li>
                        <li>The CART Secretariat prepares a monthly summary of feedback and submits it to:<br />
                          <span className="ml-4 block">- CART Chairperson / Supervising Senior Executive Official (Central Office)</span>
                          <span className="ml-4 block">- Regional Director (Regional Offices)</span>
                        </li>
                        <li>Feedback is used as a reference for process, product, and service improvements.</li>
                      </ol>
                    </div>
                    <div>
                      <span className="font-semibold text-yellow-700">How to File a Complaint:</span>
                      <ul className="list-disc ml-6 mt-1 space-y-1">
                        <li>For service-related complaints against DICT, email the Anti-Red Tape Authority (ARTA) at: <a href="mailto:complaints@arta.gov.ph" className="text-blue-700 underline">complaints@arta.gov.ph</a></li>
                        <li>Include the following details:
                          <ul className="list-[circle] ml-6 mt-1">
                            <li>Full name and contact information of the complainant</li>
                            <li>Sex and Gender</li>
                            <li>Incident details / narrative of concern</li>
                            <li>Evidence</li>
                            <li>Name of the person/office being complained of</li>
                          </ul>
                        </li>
                        <li>Other channels:
                          <ul className="list-[circle] ml-6 mt-1">
                            <li>Presidential Complaint Center (PCC): <a href="mailto:pcc@malacanang.gov.ph" className="text-blue-700 underline">pcc@malacanang.gov.ph</a>, Hotline: <a href="tel:8888" className="text-blue-700 underline">8888</a></li>
                            <li>CCB (SMS): <a href="sms:09088816565" className="text-blue-700 underline">0908 881 6565</a></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-semibold text-yellow-700">How Complaints Are Processed:</span>
                      <ol className="list-decimal ml-6 mt-1 space-y-1">
                        <li>The DICT Committee on Anti-Red Tape (CART) evaluates complaints filed through ARTA.</li>
                        <li>CART determines jurisdiction and authority.</li>
                        <li>CART conducts investigation and forwards the complaint to the concerned office for explanation.</li>
                        <li>The concerned office must respond within 3 days.</li>
                        <li>CART submits a CART Referral Report and returns the docket to ARTA within 20 working days (extendible once with complainant’s consent).</li>
                        <li>If resolved: Complainant files a Consent to Closure Complaint (ARTA MC No. 2021-11).</li>
                        <li>If unresolved: CART submits:
                          <ul className="list-[circle] ml-6 mt-1">
                            <li>Sworn Affidavit of the Complainant</li>
                            <li>Counter-Affidavit of the Complained Government Official</li>
                            <li>Recommendation of the CART Chairperson or DICT Head</li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                    <div>
                      <span className="font-semibold text-yellow-700">Contact Information:</span>
                      <ul className="list-disc ml-6 mt-1">
                        <li>ARTA: <a href="mailto:complaints@arta.gov.ph" className="text-blue-700 underline">complaints@arta.gov.ph</a></li>
                        <li>PCC: <a href="tel:8888" className="text-blue-700 underline">8888</a></li>
                        <li>CCB (SMS): <a href="sms:09088816565" className="text-blue-700 underline">0908 881 6565</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col p-6 overflow-hidden animate-fade-in">
                <Button
                  onClick={handleBackToList}
                  variant="ghost"
                  className="w-fit mb-6 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Services
                </Button>
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-5">
                  <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-blue-100 text-xs font-medium mb-1">DICT External Service</p>
                        <p className="text-xl font-bold">{selectedService.title}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      Description
                    </h3>
                    <p className="text-slate-700 leading-relaxed mb-2">{selectedService.description}</p>
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-1">Procedure:</h4>
                      <ol className="list-decimal ml-6 text-slate-700 space-y-1">
                        {selectedService.procedure.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-1">Processing Time:</h4>
                      <p className="ml-6 text-slate-700">{selectedService.processingTime}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-1">Person Responsible:</h4>
                      <ul className="list-disc ml-6 text-slate-700 space-y-1">
                        {selectedService.personResponsible.map((person, idx) => (
                          <li key={idx}>{person}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[30%] flex flex-col gap-4">
          {/* Logo */}

          <div className=" flex  flex-row-reverse  gap-2">
            <a href="https://www.facebook.com/DICTRegion10" target="_blank" className=" w-[70%] h-[80%] self-center bg-white rounded-full flex  p-5 animate-fade-in-down items-center justify-center">
              <div className="flex items-center justify-center">
                <img src="./DICT-1024x522.webp" className="h-[100px] object-contain drop-shadow-lg" alt="DICT Logo" />
              </div>
            </a>

            <div className="bg-white/95 backdrop-blur-sm w-full rounded-2xl shadow-xl border border-blue-100/50  animate-fade-in-down">
              <div className="grid grid-cols-1 gap-4">
                {/* Time Section */}
                {/* <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-100" />
                    <div className="text-xs font-bold text-blue-100 uppercase tracking-wide">Time</div>
                  </div>
                  <div className="text-3xl font-bold text-white tabular-nums mb-1">
                    {formatTime(currentTime)}
                  </div>
                  <div className="text-xs text-blue-100">
                    {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div> */}

                {/* Weather Section */}
                <div className="bg-gradient-to-br from-sky-400 to-blue-600 p-4 rounded-xl shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  <div className="relative z-10">


                    <div className="flex items-center justify-between mb-2">
                      <div className="text-3xl font-bold text-white">{weather?.temperature || 24}°C</div>
                      <div className="flex items-center gap-1.5 text-xs text-sky-100">
                        <Droplets className="w-3 h-3" />
                        <span>{weather?.humidity || 65}%</span>
                      </div>
                    </div>
                    <div className="space-y-1">


                      <div className="text-3xl font-bold text-white tabular-nums mb-1">
                        {formatTime(currentTime)}
                      </div>
                      <div className="text-xs text-blue-100">
                        {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-sky-100">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{weather?.location || 'Unknown'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Time & Weather Widget */}


          {/* Swipeable Panels */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 p-5 animate-fade-in-down overflow-hidden relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                {currentPanel === 0 ? (
                  <>
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    Events
                  </>
                ) : currentPanel === 1 ? (
                  <>
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <Newspaper className="w-4 h-4 text-white" />
                    </div>
                    News
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Megaphone className="w-4 h-4 text-white" />
                    </div>
                    Announcements
                  </>
                )}
              </h2>
              <div className="flex gap-1.5">
                <button
                  onClick={toggleAutoSwipe}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${!isAutoSwipe
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  title={isAutoSwipe ? 'Stop auto-swipe' : 'Start auto-swipe'}
                >
                  {!isAutoSwipe ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </button>
                <button
                  onClick={prevPanel}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                </button>
                <button
                  onClick={nextPanel}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            <div
              className="relative overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentPanel * 100}%)` }}
              >
                {/* Panel 1: Calendar Events */}
                <div className="w-full flex-shrink-0">
                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto custom-scrollbar">
                    {events.slice(0, 4).map((event, index) => (
                      <div
                        key={index}
                        className="group bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border-l-4 border-blue-500 hover:border-blue-600 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 mb-2">
                          {event.title}
                        </h3>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Calendar className="w-3 h-3" />
                            {event.date}
                          </div>
                          <span className="px-2.5 py-1 bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-sm">
                            {event.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Panel 2: Latest News */}
                <div className="w-full flex-shrink-0">
                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto custom-scrollbar">
                    {news.map((item, index) => (
                      <div
                        key={index}
                        className="group bg-white rounded-lg border border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all duration-300 overflow-hidden"
                      >
                        <iframe
                          src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(item.postUrl)}&show_text=true&width=500`}
                          className="w-full h-[400px] border-0"
                          scrolling="no"
                          frameBorder="0"
                          allowFullScreen={true}
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        ></iframe>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Panel 3: Announcements */}
                <div className="w-full flex-shrink-0">
                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto custom-scrollbar">
                    {announcements.map((item, index) => (
                      <div
                        key={index}
                        className="group bg-gradient-to-r from-orange-50 to-white p-4 rounded-lg border-l-4 border-orange-500 hover:border-orange-600 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <h3 className="text-sm font-bold text-slate-800 group-hover:text-orange-700 mb-2">
                          {item.title}
                        </h3>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </div>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm ${item.priority === 'High' ? 'bg-red-500 text-white' :
                            item.priority === 'Medium' ? 'bg-amber-500 text-white' :
                              'bg-slate-400 text-white'
                            }`}>
                            {item.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPanel(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentPanel
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* YouTube Video Carousel */}
          <div className="flex-1 min-h-0 bg-white from-white via-blue-50/30 to-indigo-50/30 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 p-4 pb-2 flex flex-col animate-fade-in-up">
            {/* Compact Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Featured Videos</h3>
                </div>
              </div>
              <div className=" flex gap-3">
                <button
                  onClick={prevVideo}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                </button>
                <button
                  onClick={nextVideo}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
            {/* Larger Video Container */}
            <div className="flex-1 min-h-0 relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl ring-1 ring-black/5">
              <iframe
                key={currentVideoIndex}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoIds[currentVideoIndex]}?autoplay=1&rel=0&enablejsapi=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {/* Enhanced Video Indicators */}
            <div className="flex items-center justify-center gap-2 mt-2">
              {videoIds.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`group relative transition-all duration-300 ${index === currentVideoIndex ? 'w-10' : 'w-2.5'}`}
                >
                  <div className={`h-2 rounded-full transition-all duration-300 ${index === currentVideoIndex
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/50'
                    : 'bg-slate-300 group-hover:bg-slate-400 group-hover:scale-125'
                    }`} />
                  {index === currentVideoIndex && (
                    <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wiggle {
          0% { transform: rotate(0deg) scale(1); }
          15% { transform: rotate(-10deg) scale(1.1); }
          30% { transform: rotate(10deg) scale(1.1); }
          45% { transform: rotate(-8deg) scale(1.08); }
          60% { transform: rotate(8deg) scale(1.08); }
          75% { transform: rotate(-4deg) scale(1.04); }
          90% { transform: rotate(4deg) scale(1.04); }
          100% { transform: rotate(0deg) scale(1); }
        }
        .animate-wiggle {
          animation: wiggle 1s ease-in-out;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  )
}

export default Dashboard