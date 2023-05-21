const { useRouter } = require("next/router");
const { useEffect } = require("react");

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth/login");
  }, [router]);
  return;
};

export default Index;
