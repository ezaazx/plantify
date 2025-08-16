'use client';

import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function DiagnosePage() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [prediction, setPrediction] = useState('');
  const [organicText, setOrganicText] = useState('');
  const [chemicalText, setChemicalText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl('');
    setPrediction('');
    setOrganicText('');
    setChemicalText('');
    setAnalysisDone(false);
  };

  const handleDiagnose = async () => {
    if (!image) return alert("Please select an image.");
    setLoading(true);

    try {
      // Step 1: Upload image to Cloudinary
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET);

      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        formData
      );

      const cloudinaryUrl = uploadRes.data.secure_url;
      setImageUrl(cloudinaryUrl);

      // Step 2: Send image to AI model for disease detection
      const aiRes = await axios.post('http://localhost:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const disease = aiRes.data.prediction;
      setPrediction(disease);

      // Step 3: Generate remedies from Gemini
      const prompt = `My crop is affected by ${disease}. Suggest 5 most common organic remedies and 5 most common chemical remedies. Reply in two short paragraphs. First for organic, second for chemical. No bullets, no formatting. Only clear to-the-point plain text.`;

      const geminiRes = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const text = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const [organic, chemical] = text.split(/\n\s*\n/);
      setOrganicText(organic);
      setChemicalText(chemical);
      setAnalysisDone(true);
    } catch (err) {
      console.error(err);
      alert("Error during diagnosis.");
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please log in to post.");
        return;
      }

      if (!prediction || !organicText || !chemicalText || !imageUrl) {
        alert("Please complete diagnosis first.");
        return;
      }

      const postData = {
        userEmail: user.email || "anonymous@user.com",
        userId: user.uid,
        prediction,
        organicText,
        chemicalText,
        imageUrl,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'posts'), postData);
      console.log("✅ Post uploaded with ID:", docRef.id);
      alert("✅ Diagnosis posted to timeline!");

      // Reset form
      setImage(null);
      setImageUrl('');
      setPrediction('');
      setOrganicText('');
      setChemicalText('');
      setAnalysisDone(false);
    } catch (err) {
      console.error("❌ Firestore upload failed:", err);
      alert("❌ Failed to post diagnosis.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white">
      <Header />
      <div className="flex items-center justify-center p-6 pt-40">
        <div className="bg-green-50 rounded-2xl shadow-xl p-8 w-full max-w-xl text-center border border-green-200">
          <h1 className="text-3xl font-bold text-green-900 mb-6"> Plant Diagnosis</h1>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm text-green-700 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-200 file:text-green-900 hover:file:bg-green-300 cursor-pointer mb-4"
          />

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              className="rounded shadow-md max-h-60 mx-auto mb-4"
            />
          )}

         <div className="flex justify-center gap-4 mt-4 flex-wrap">
  <button
    onClick={handleDiagnose}
    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full disabled:opacity-50"
    disabled={loading}
  >
    {loading ? 'Diagnosing...' : 'Upload & Diagnose'}
  </button>

  <button
    onClick={handlePost}
    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full disabled:opacity-50"
    disabled={!analysisDone}
  >
    Post to Timeline
  </button>
</div>
c

          {prediction && (
            <div className="mt-6 text-green-900 text-left">
              <h3 className="text-lg font-bold mb-2">Disease Detected:</h3>
              <p className="mb-4">{prediction}</p>

              <h3 className="text-lg font-bold mb-1">Organic Remedies:</h3>
              <p className="mb-4">{organicText}</p>

              <h3 className="text-lg font-bold mb-1">Chemical Remedies:</h3>
              <p>{chemicalText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
