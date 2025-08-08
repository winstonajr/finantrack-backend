const checkHealth = (req, res) => {
    return res.status(200).json({
    message: 'A API do FinanTrack está funcionando perfeitamente!',
    status: 'UP',
  })
}

export { checkHealth }