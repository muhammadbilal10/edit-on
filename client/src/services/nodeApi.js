import axios from 'axios'

export const postVideo = async (userId, videoData, onProgress) => {
    try {
        const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: onProgress,
          };
        const response = await axios.post(`${import.meta.env.VITE_NODE_API}video/${userId}`, videoData, config)
        return response
    } catch (err) {
        return err.message
    }
}

export const verifyEmail = async () => {
    // Extract the verification token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
  
    if (!token) {
      throw new Error('Verification token not found in the URL');
    }
  
    try {
      const response = await axios.get(`${import.meta.env.VITE_NODE_API}verify/${token}`);
      return response.data;
    } catch (err) {
      return err.response.data; // Assuming you want to return the error message from the API
    }
  };

export const searchByTitle = async (query) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_NODE_API}video/search?q=${query}`)
        return response.data.result
    } catch (err) {
        return err.message
    }
}

export const getById = async (videoId) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_NODE_API}searchlist/video/${videoId}`)
        return response.data.result
    } catch (err) {
        return err.message
    }
}

export const updateVideo = async (userId, videoId, videoData) => {
    try {
        const response = await axios
                            .put(`${import.meta.env.VITE_NODE_API}video/${userId}/${videoId}`, videoData)
        return response.data.result
    } catch (err) {
        return err.message
    }
}

export const deleteVideo = async (userId, videoId) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_NODE_API}video/${userId}/${videoId}`)
        return response.data.result
    } catch (err) {
        return err.message
    }
}

export const getAllVideos = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_NODE_API}video`)
        console.log(response.data)
        return response.data
    } catch (err) {
        return err.message
    }
}