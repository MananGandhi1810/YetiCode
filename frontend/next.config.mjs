/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/ppt",
        destination:
          "https://www.canva.com/design/DAGdr6RT-vE/nLnxMKpejJpspy0lXxT9oA/edit",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
