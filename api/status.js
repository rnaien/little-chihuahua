export default function handler(req, res) {
  res.status(200).json({
    envVar: 'SITE_BUILD_TAG',
    isSet: Boolean(process.env.SITE_BUILD_TAG),
  });
}
