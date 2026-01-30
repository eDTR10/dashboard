import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Calendar, Cloud, Search, ArrowRight, ArrowLeft, Clock, FileText, Users, Newspaper, Megaphone, Lock, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"

interface CitizenService {
  id: string
  title: string
  category: string
  description: string
  requirements: string[]
  processingTime: string
  fee: string
  office: string
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

  // Sample YouTube video IDs - replace with your actual videos
  const videoIds = [
    "dQw4w9WgXcQ",
    "9bZkp7q19f0",
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
    { date: "Jan 30, 2026", title: "New Digital Services Launched", category: "Technology" },
    { date: "Jan 28, 2026", title: "DICT Announces Free Training Programs", category: "Education" },
    { date: "Jan 25, 2026", title: "Cybersecurity Awareness Campaign", category: "Security" },
    { date: "Jan 22, 2026", title: "Free WiFi Expansion Project", category: "Infrastructure" },
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
      title: "Birth Certificate Request", 
      category: "Civil Registry",
      description: "Request for a certified true copy of your birth certificate from the Civil Registry Office.",
      requirements: [
        "Valid Government ID",
        "PSA Form (for authenticated copy)",
        "Payment receipt"
      ],
      processingTime: "3-5 working days",
      fee: "₱150.00",
      office: "Civil Registry Office"
    },
    { 
      id: "2",
      title: "Business Permit Application", 
      category: "Business & Trade",
      description: "Apply for a new business permit to operate legally within the municipality.",
      requirements: [
        "DTI/SEC Registration",
        "Barangay Clearance",
        "Location Clearance",
        "Fire Safety Inspection Certificate",
        "Sanitary Permit"
      ],
      processingTime: "7-10 working days",
      fee: "₱2,500.00 - ₱5,000.00",
      office: "Business Permits & Licensing Office"
    },
    { 
      id: "3",
      title: "Building Permit Request", 
      category: "Engineering",
      description: "Secure approval for construction, renovation, or repair of buildings and structures.",
      requirements: [
        "Lot Plan and Survey",
        "Architectural Plans",
        "Structural Plans",
        "Tax Declaration",
        "Barangay Clearance"
      ],
      processingTime: "15-20 working days",
      fee: "Based on project cost",
      office: "Office of the Building Official"
    },
    { 
      id: "4",
      title: "Community Tax Certificate", 
      category: "Treasury",
      description: "Obtain your Community Tax Certificate (Cedula) for various transactions.",
      requirements: [
        "Valid Government ID",
        "TIN Number (if applicable)",
        "Proof of income (for higher amounts)"
      ],
      processingTime: "Same day",
      fee: "₱5.00 - ₱500.00",
      office: "Municipal Treasurer's Office"
    },
    { 
      id: "5",
      title: "Marriage Certificate Request", 
      category: "Civil Registry",
      description: "Request for a certified true copy of your marriage certificate.",
      requirements: [
        "Valid Government ID",
        "PSA Form",
        "Payment receipt"
      ],
      processingTime: "3-5 working days",
      fee: "₱150.00",
      office: "Civil Registry Office"
    },
    { 
      id: "6",
      title: "Barangay Clearance", 
      category: "Barangay Services",
      description: "Obtain a clearance from your barangay for various purposes.",
      requirements: [
        "Valid Government ID",
        "Barangay ID (if available)",
        "Certificate of Residency"
      ],
      processingTime: "Same day",
      fee: "₱50.00",
      office: "Barangay Hall"
    },
  ]

  const filteredServices = citizenItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
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
          // Convert Kelvin to Celsius: Celsius = Kelvin - 273.15
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
        // Set default values if API fails
        setWeather({
          temperature: 24,
          humidity: 65,
          description: 'Partly Cloudy',
          location: 'Cagayan de Oro'
        })
      }
    }
    
    fetchWeather()
    // Fetch weather every 10 minutes
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

  const handleVideoEnd = () => {
    // Automatically go to next video when current video ends
    nextVideo()
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videoIds.length) % videoIds.length)
  }

  const handleSearch = () => {
    // Search is now reactive through filteredServices
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
      // Swiped left
      setCurrentPanel(1)
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      <div className="h-full w-full flex gap-4 p-4">
        {/* Left Side - Citizen Charter */}
        <div className="flex-1 bg-white rounded-xl shadow-xl border-2 border-blue-200 overflow-hidden p-6">
          <div className="h-full flex flex-col">
            {/* Header - Always visible */}
            <div className="mb-4 animate-fade-in">
              <h1 className="text-3xl font-bold text-blue-900 mb-4">
                {selectedService ? `Citizen Charter - ${selectedService.title}` : 'Citizen Charter'}
              </h1>
              
              {!selectedService && (
                /* Search Input */
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full h-12 pl-4 pr-12 text-base border-2 border-blue-300 focus:border-blue-500 rounded-lg"
                  />
                  <Button
                    onClick={handleSearch}
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>

            {!selectedService ? (
              <>
                {/* Service Items */}
                <div className="flex-1 space-y-3 overflow-y-auto">
                  {filteredServices.length > 0 ? (
                    filteredServices.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => handleServiceClick(item)}
                        className="w-full group bg-gradient-to-r from-blue-50 to-white p-5 rounded-lg border-2 border-blue-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-between"
                        style={{
                          animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both`
                        }}
                      >
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-blue-600 mt-1">{item.category}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-blue-500 group-hover:text-blue-700 group-hover:translate-x-2 transition-all" />
                      </button>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <Search className="w-16 h-16 text-blue-300 mb-4" />
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">No services found</h3>
                      <p className="text-sm text-blue-600">Try adjusting your search terms</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Service Detail View */}
                <div className="flex-1 flex flex-col animate-fade-in overflow-hidden">
                  {/* Back Button */}
                  <Button
                    onClick={handleBackToList}
                    variant="ghost"
                    className="w-fit mb-4 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Services
                  </Button>

                  {/* Service Details */}
                  <div className="flex-1 overflow-y-auto space-y-6">
                    {/* Category Badge */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-5 rounded-lg">
                      <p className="text-blue-100 text-sm font-medium">{selectedService.category}</p>
                    </div>

                    {/* Description */}
                    <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                      <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Description
                      </h3>
                      <p className="text-blue-800">{selectedService.description}</p>
                    </div>

                    {/* Requirements */}
                    <div className="bg-white p-5 rounded-lg border-2 border-blue-200">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Requirements
                      </h3>
                      <ul className="space-y-2">
                        {selectedService.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2 text-blue-800">
                            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Processing Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-2 border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold text-blue-900">Processing Time</h4>
                        </div>
                        <p className="text-blue-800 font-medium">{selectedService.processingTime}</p>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">💵</span>
                          <h4 className="font-semibold text-green-900">Fee</h4>
                        </div>
                        <p className="text-green-800 font-medium">{selectedService.fee}</p>
                      </div>
                    </div>

                    {/* Office */}
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-lg border-2 border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        <h4 className="font-semibold text-purple-900">Office Location</h4>
                      </div>
                      <p className="text-purple-800 font-medium">{selectedService.office}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Side - Fixed */}
        <div className="w-[400px] flex flex-col gap-3">
          {/* Logo */}
          <div className=" p-4 animate-fade-in-down">
            <div className="flex items-center gap-3">
             <img src="./DICT-1024x522.webp" className=" h-[120px] object-contain" alt="" />
            </div>
          </div>

          {/* Time & Weather Widget - Combined */}
          <div className="bg-white rounded-xl shadow-xl border-2 border-blue-200 p-4 animate-fade-in-down">
            <div className="grid grid-cols-2 gap-3">
              {/* Time Section */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg">
                <div className="text-xs font-semibold text-blue-700 mb-1">TIME</div>
                <div className="text-2xl font-bold text-blue-900 tabular-nums">
                  {formatTime(currentTime)}
                </div>
                <div className="text-[9px] text-blue-600 mt-0.5">
                  {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              
              {/* Weather Section */}
              <div className="bg-gradient-to-br from-sky-50 to-sky-100 p-3 rounded-lg">
                <div className="text-xs font-semibold text-sky-700 mb-1 flex items-center gap-1">
                  <Cloud className="w-3 h-3" />
                  WEATHER
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-900">{weather?.temperature || 24}°C</div>
                    <div className="text-[9px] text-blue-600 mt-0.5 capitalize">{weather?.description || 'Loading...'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-blue-600">💧 {weather?.humidity || 65}%</div>
                    <div className="text-[9px] text-blue-600 mt-0.5">📍 {weather?.location || 'Unknown'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Events & Latest News - Swipeable */}
          <div className="bg-white rounded-xl shadow-xl border-2 border-blue-200 p-4 animate-fade-in-down overflow-hidden relative">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                {currentPanel === 0 ? (
                  <>
                    <Calendar className="w-4 h-4" />
                    Calendar Events
                  </>
                ) : currentPanel === 1 ? (
                  <>
                    <Newspaper className="w-4 h-4" />
                    Latest News
                  </>
                ) : (
                  <>
                    <Megaphone className="w-4 h-4" />
                    Announcements
                  </>
                )}
              </h2>
              <div className="flex gap-1">
                <button
                  onClick={toggleAutoSwipe}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    isAutoSwipe ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 text-blue-600'
                  }`}
                  title={isAutoSwipe ? 'Stop auto-swipe' : 'Start auto-swipe'}
                >
                  {isAutoSwipe ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                </button>
                <button
                  onClick={prevPanel}
                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  onClick={nextPanel}
                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-blue-600" />
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
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentPanel * 100}%)` }}
              >
                {/* Panel 1: Calendar Events */}
                <div className="w-full flex-shrink-0">
                  <div className="border-t-2 border-dashed border-blue-300 pt-3 space-y-2 max-h-[160px] overflow-y-auto">
                    {events.slice(0, 3).map((event, index) => (
                      <div
                        key={index}
                        className="group bg-gradient-to-r from-blue-50 to-white p-3 rounded-lg border-l-4 border-blue-500 hover:border-blue-700 hover:shadow-md transition-all duration-300"
                      >
                        <h3 className="text-sm font-semibold text-blue-900 group-hover:text-blue-700">
                          {event.title}
                        </h3>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-[10px] text-blue-600">{event.date}</p>
                          <span className="px-2 py-0.5 bg-blue-500 text-white rounded-full text-[10px] font-medium">
                            {event.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Panel 2: Latest News */}
                <div className="w-full flex-shrink-0">
                  <div className="border-t-2 border-dashed border-blue-300 pt-3 space-y-2 max-h-[160px] overflow-y-auto">
                    {news.map((item, index) => (
                      <div
                        key={index}
                        className="group bg-gradient-to-r from-green-50 to-white p-3 rounded-lg border-l-4 border-green-500 hover:border-green-700 hover:shadow-md transition-all duration-300"
                      >
                        <h3 className="text-sm font-semibold text-blue-900 group-hover:text-blue-700">
                          {item.title}
                        </h3>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-[10px] text-blue-600">{item.date}</p>
                          <span className="px-2 py-0.5 bg-green-500 text-white rounded-full text-[10px] font-medium">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Panel 3: Announcements */}
                <div className="w-full flex-shrink-0">
                  <div className="border-t-2 border-dashed border-blue-300 pt-3 space-y-2 max-h-[160px] overflow-y-auto">
                    {announcements.map((item, index) => (
                      <div
                        key={index}
                        className="group bg-gradient-to-r from-orange-50 to-white p-3 rounded-lg border-l-4 border-orange-500 hover:border-orange-700 hover:shadow-md transition-all duration-300"
                      >
                        <h3 className="text-sm font-semibold text-blue-900 group-hover:text-blue-700">
                          {item.title}
                        </h3>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-[10px] text-blue-600">{item.date}</p>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            item.priority === 'High' ? 'bg-red-500 text-white' :
                            item.priority === 'Medium' ? 'bg-yellow-500 text-white' :
                            'bg-gray-500 text-white'
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
            <div className="flex justify-center gap-2 mt-3">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPanel(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentPanel 
                      ? 'w-6 bg-blue-600' 
                      : 'w-1.5 bg-blue-300 hover:bg-blue-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* YouTube Video Carousel */}
          <div className="flex-1 bg-white rounded-xl shadow-xl border-2 border-blue-200 p-4 flex flex-col animate-fade-in-up min-h-[250px]">
            <div className="flex-1 relative rounded-lg overflow-hidden bg-black group">
              <iframe
                key={currentVideoIndex}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoIds[currentVideoIndex]}?autoplay=1&rel=0&enablejsapi=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              
              {/* Navigation Buttons */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  onClick={prevVideo}
                  size="icon"
                  className="bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg h-9 w-9"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={nextVideo}
                  size="icon"
                  className="bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg h-9 w-9"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Video Indicator */}
            <div className="flex justify-center gap-2 mt-3">
              {videoIds.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentVideoIndex 
                      ? 'w-6 bg-blue-600' 
                      : 'w-1.5 bg-blue-300 hover:bg-blue-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
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

        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }

        .animate-pulse-subtle {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  )
}

export default Dashboard
