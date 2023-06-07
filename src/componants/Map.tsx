/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, Polygon } from '@react-google-maps/api';

const center = { lat: 13.736717, lng: 100.523186 }; // พิกัดศูนย์กลางแผนที่
const defaultZoom = 15; // ระดับซูมเริ่มต้น

const areas = [
  { name: 'เขตประเวศ', paths: [{ lat: 13.696217, lng: 100.642464 }] },
  { name: 'เขตบางแค', paths: [{ lat: 13.704424, lng: 100.403305 }] },
  { name: 'เขตพญาไท', paths: [{ lat: 13.757498, lng: 100.534869 }] },
  { name: 'เขตราชเทวี', paths: [{ lat: 13.770486, lng: 100.533713 }] },
  { name: 'เขตดุสิต', paths: [{ lat: 13.778889, lng: 100.513333 }] },
  { name: 'เขตหนองจอก', paths: [{ lat: 13.857373, lng: 100.827255 }] },
  { name: 'เขตบางรัก', paths: [{ lat: 13.725858, lng: 100.524345 }] },
  { name: 'เขตบางเขน', paths: [{ lat: 13.859124, lng: 100.595549 }] },
  { name: 'เขตบางกะปิ', paths: [{ lat: 13.765083, lng: 100.647561 }] },
  { name: 'เขตปทุมวัน', paths: [{ lat: 13.744942, lng: 100.530200 }] },
  { name: 'เขตป้อมปราบศัตรูพ่าย', paths: [{ lat: 13.752408, lng: 100.509641 }] },
  { name: 'เขตพระนคร', paths: [{ lat: 13.752942, lng: 100.498843 }] },
  { name: 'เขตพระโขนง', paths: [{ lat: 13.705958, lng: 100.591836 }] },
  { name: 'เขตมีนบุรี', paths: [{ lat: 13.813240, lng: 100.718598 }] },
  { name: 'เขตลาดกระบัง', paths: [{ lat: 13.726339, lng: 100.783737 }] },
  { name: 'เขตยานนาวา', paths: [{ lat: 13.693262, lng: 100.543818 }] },
  { name: 'เขตสัมพันธวงศ์', paths: [{ lat: 13.729459, lng: 100.512230 }] },
  { name: 'เขตพฤษภาคม', paths: [{ lat: 13.735893, lng: 100.529715 }] },
  { name: 'เขตบางพลัด', paths: [{ lat: 13.779853, lng: 100.481495 }] },
  { name: 'เขตดินแดง', paths: [{ lat: 13.769036, lng: 100.552129 }] },
  { name: 'เขตห้วยขวาง', paths: [{ lat: 13.766256, lng: 100.579392 }] },
  { name: 'เขตสาทร', paths: [{ lat: 13.717261, lng: 100.527265 }] },
  { name: 'เขตบางซื่อ', paths: [{ lat: 13.805012, lng: 100.530673 }] },
  { name: 'เขตจตุจักร', paths: [{ lat: 13.804300, lng: 100.554289 }] },
  { name: 'เขตบางคอแหลม', paths: [{ lat: 13.681495, lng: 100.508487 }] },
  { name: 'เขตประเวศ', paths: [{ lat: 13.696217, lng: 100.642464 }] },
  { name: 'เขตคลองเตย', paths: [{ lat: 13.714346, lng: 100.575377 }] },
  { name: 'เขตสวนหลวง', paths: [{ lat: 13.740179, lng: 100.576789 }] },
  { name: 'เขตจอมทอง', paths: [{ lat: 13.713362, lng: 100.461832 }] },
  { name: 'เขตดอนเมือง', paths: [{ lat: 13.905415, lng: 100.548911 }] },
  { name: 'เขตราษฎร์บูรณะ', paths: [{ lat: 13.859083, lng: 100.874613 }] },
  { name: 'เขตบางพลี', paths: [{ lat: 13.661080, lng: 100.742659 }] },
  { name: 'เขตหนองแขม', paths: [{ lat: 13.659097, lng: 100.663239 }] },

];

interface TransformerMapProps { }

const TransformerMap: React.FC<TransformerMapProps> = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(event.target.value);
  };

  const handleMapLoad = (map: google.maps.Map) => {
    mapInstanceRef.current = map;
  };

  useEffect(() => {
    if (selectedArea) {
      const selectedAreaObj = areas.find((area) => area.name === selectedArea);
      if (selectedAreaObj && mapInstanceRef.current) {
        const bounds = new window.google.maps.LatLngBounds();
        selectedAreaObj.paths.forEach((path) => bounds.extend(path));
        // อ้างอิงกลับไปยังตำแหน่งศูนย์กลางและระดับซูมเริ่มต้นแทนการใช้ fitBounds()
        bounds.extend(center);
        mapInstanceRef.current.panToBounds(bounds);
      }
    }
  }, [selectedArea]);

  return (
    <div className='Map'>
      <h1>Transformer Map</h1>
      <select id="area-select" value={selectedArea || ''} onChange={handleAreaChange}>
        <option value="">-- เลือกเขต --</option>
        {areas.map((area) => {
          return (
            <option key={area.name} value={area.name}>
              {area.name}
            </option>
          );
        })}
      </select>
      <GoogleMap
        mapContainerStyle={{ width: '50vw', height: '30vw' }}
        center={center}
        zoom={defaultZoom}
        onLoad={handleMapLoad}
      >
        {areas.map((area) => (
          <Polygon
            key={area.name}
            paths={area.paths}
            onClick={() => setSelectedArea(area.name)}
            options={{
              strokeColor: selectedArea === area.name ? 'red' : 'blue',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: selectedArea === area.name ? 'red' : 'blue',
              fillOpacity: 0.35,
            }}
          />
        ))}
        {selectedArea && (
          // สร้างมาร์คเกี่ยวกับตำแหน่งหม้อแปลงไฟฟ้าในเขตที่เลือก
          <>
            <Marker position={{ lat: 13.7, lng: 100.6 }} />
            <Marker position={{ lat: 13.71, lng: 100.41 }} />
            {/* เพิ่มตำแหน่งหม้อแปลงไฟฟ้าอื่น ๆ ตามต้องการ */}
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export default TransformerMap;
