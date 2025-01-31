"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  FileText,
  GitPullRequest,
  MessageSquare,
  BarChart2,
} from "lucide-react";
import VulnerabilityAnalysis from "./vulnerability-analysis";
import ReadmeGenerator from "./readme-generator";
import CodeReview from "./code-review";
import ChatWithRepo from "./chat-with-repo";
import DiagramRenderer from "./diagram-renderer";
import FlowChartPage from "@/app/architect/page";
import { useQueryState } from "nuqs";
import axios from "axios";

export default function Dashi({ slug }) {
  console.log(slug);
  const [activeTab, setActiveTab] = useQueryState("tabs", {
    defaultValue: "vulnerability",
  });
  const [data, setData] = useState({
    success: true,
    message: "Data generated successfully",
    data: {
      scan: [
        {
          cvss: {
            score: 5.6,
            vector_string: "CVSS:3.1/AV:L/AC:H/PR:H/UI:R/S:U/C:H/I:H/A:N",
          },
          description: null,
          ghsa_id: "GHSA-9wx4-h78v-vm56",
          html_url: "https://github.com/advisories/GHSA-9wx4-h78v-vm56",
          identifiers: [
            {
              type: "GHSA",
              value: "GHSA-9wx4-h78v-vm56",
            },
            {
              type: "CVE",
              value: "CVE-2024-35195",
            },
          ],
          published_at: "2024-05-20T20:15:00Z",
          references: [
            "https://github.com/psf/requests/security/advisories/GHSA-9wx4-h78v-vm56",
            "https://github.com/psf/requests/pull/6655",
            "https://github.com/psf/requests/commit/a58d7f2ffb4d00b46dca2d70a3932a0b37e22fac",
            "https://nvd.nist.gov/vuln/detail/CVE-2024-35195",
            "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/IYLSNK5TL46Q6XPRVMHVWS63MVJQOK4Q",
            "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/N7WP6EYDSUOCOJYHDK5NX43PYZ4SNHGZ",
            "https://github.com/advisories/GHSA-9wx4-h78v-vm56",
          ],
          severity: "medium",
          source_code_location: "https://github.com/psf/requests",
          summary:
            "Requests `Session` object does not verify requests after making first request with verify=False",
          updated_at: "2024-06-10T18:31:04Z",
          url: "https://api.github.com/advisories/GHSA-9wx4-h78v-vm56",
          vulnerabilities: [
            {
              first_patched_version: "2.32.0",
              package: {
                ecosystem: "pip",
                name: "requests",
              },
              vulnerable_functions: [],
              vulnerable_version_range: "< 2.32.0",
            },
          ],
        },
        {
          cvss: {
            score: 6.1,
            vector_string: "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:C/C:H/I:N/A:N",
          },
          description: null,
          ghsa_id: "GHSA-j8r2-6x86-q33q",
          html_url: "https://github.com/advisories/GHSA-j8r2-6x86-q33q",
          identifiers: [
            {
              type: "GHSA",
              value: "GHSA-j8r2-6x86-q33q",
            },
            {
              type: "CVE",
              value: "CVE-2023-32681",
            },
          ],
          published_at: "2023-05-22T20:36:32Z",
          references: [
            "https://github.com/psf/requests/security/advisories/GHSA-j8r2-6x86-q33q",
            "https://github.com/psf/requests/commit/74ea7cf7a6a27a4eeb2ae24e162bcc942a6706d5",
            "https://nvd.nist.gov/vuln/detail/CVE-2023-32681",
            "https://github.com/psf/requests/releases/tag/v2.31.0",
            "https://github.com/pypa/advisory-database/tree/main/vulns/requests/PYSEC-2023-74.yaml",
            "https://lists.debian.org/debian-lts-announce/2023/06/msg00018.html",
            "https://security.gentoo.org/glsa/202309-08",
            "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/AW7HNFGYP44RT3DUDQXG2QT3OEV2PJ7Y",
            "https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/KOYASTZDGQG2BWLSNBPL3TQRL2G7QYNZ",
            "https://github.com/advisories/GHSA-j8r2-6x86-q33q",
          ],
          severity: "medium",
          source_code_location: "https://github.com/psf/requests",
          summary: "Unintended leak of Proxy-Authorization header in requests",
          updated_at: "2024-03-27T20:09:55Z",
          url: "https://api.github.com/advisories/GHSA-j8r2-6x86-q33q",
          vulnerabilities: [
            {
              first_patched_version: "2.31.0",
              package: {
                ecosystem: "pip",
                name: "requests",
              },
              vulnerable_functions: [],
              vulnerable_version_range: ">= 2.3.0, < 2.31.0",
            },
          ],
        },
        {
          cvss: {
            score: 6.5,
            vector_string: "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N",
          },
          description: null,
          ghsa_id: "GHSA-8fww-64cx-x8p5",
          html_url: "https://github.com/advisories/GHSA-8fww-64cx-x8p5",
          identifiers: [
            {
              type: "GHSA",
              value: "GHSA-8fww-64cx-x8p5",
            },
            {
              type: "CVE",
              value: "CVE-2023-28859",
            },
          ],
          published_at: "2023-03-26T21:30:23Z",
          references: [
            "https://nvd.nist.gov/vuln/detail/CVE-2023-28859",
            "https://github.com/redis/redis-py/issues/2665",
            "https://github.com/redis/redis-py/pull/2641",
            "https://github.com/redis/redis-py/pull/2666",
            "https://github.com/redis/redis-py/pull/2671",
            "https://github.com/redis/redis-py/releases/tag/v4.4.4",
            "https://github.com/redis/redis-py/releases/tag/v4.5.4",
            "https://github.com/pypa/advisory-database/tree/main/vulns/redis/PYSEC-2023-46.yaml",
            "https://github.com/redis/redis-py/pull/1899",
            "https://github.com/redis/redis-py/commit/66a4d6b2a493dd3a20cc299ab5fef3c14baad965",
            "https://github.com/redis/redis-py/commit/b3c89acd0ffe8303649ad8207bc911b1d6a033eb",
            "https://github.com/advisories/GHSA-8fww-64cx-x8p5",
          ],
          severity: "high",
          source_code_location: "https://github.com/redis/redis-py",
          summary: "redis-py Race Condition due to incomplete fix",
          updated_at: "2024-10-25T21:45:10Z",
          url: "https://api.github.com/advisories/GHSA-8fww-64cx-x8p5",
          vulnerabilities: [
            {
              first_patched_version: "4.5.4",
              package: {
                ecosystem: "pip",
                name: "redis",
              },
              vulnerable_functions: [],
              vulnerable_version_range: ">= 4.5.0, < 4.5.4",
            },
            {
              first_patched_version: "4.4.4",
              package: {
                ecosystem: "pip",
                name: "redis",
              },
              vulnerable_functions: [],
              vulnerable_version_range: ">= 4.2.0, < 4.4.4",
            },
          ],
        },
        {
          cvss: {
            score: 3.7,
            vector_string: "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N",
          },
          description: null,
          ghsa_id: "GHSA-24wv-mv5m-xv4h",
          html_url: "https://github.com/advisories/GHSA-24wv-mv5m-xv4h",
          identifiers: [
            {
              type: "GHSA",
              value: "GHSA-24wv-mv5m-xv4h",
            },
            {
              type: "CVE",
              value: "CVE-2023-28858",
            },
          ],
          published_at: "2023-03-26T21:30:23Z",
          references: [
            "https://nvd.nist.gov/vuln/detail/CVE-2023-28858",
            "https://github.com/redis/redis-py/issues/2624",
            "https://github.com/redis/redis-py/pull/2641",
            "https://github.com/redis/redis-py/compare/v4.3.5...v4.3.6",
            "https://github.com/redis/redis-py/compare/v4.4.2...v4.4.3",
            "https://github.com/redis/redis-py/compare/v4.5.2...v4.5.3",
            "https://openai.com/blog/march-20-chatgpt-outage",
            "https://github.com/redis/redis-py/releases/tag/v4.4.4",
            "https://github.com/redis/redis-py/releases/tag/v4.5.4",
            "https://github.com/redis/redis-py/commit/d56baeb683fc1935cfa343fa2eeb0fa9bd955283",
            "https://github.com/pypa/advisory-database/tree/main/vulns/redis/PYSEC-2023-45.yaml",
            "https://github.com/advisories/GHSA-24wv-mv5m-xv4h",
          ],
          severity: "medium",
          source_code_location: "https://github.com/redis/redis-py",
          summary: "redis-py Race Condition vulnerability",
          updated_at: "2024-10-25T21:45:29Z",
          url: "https://api.github.com/advisories/GHSA-24wv-mv5m-xv4h",
          vulnerabilities: [
            {
              first_patched_version: "4.4.3",
              package: {
                ecosystem: "pip",
                name: "redis",
              },
              vulnerable_functions: [],
              vulnerable_version_range: ">= 4.4.0, < 4.4.3",
            },
            {
              first_patched_version: "4.5.3",
              package: {
                ecosystem: "pip",
                name: "redis",
              },
              vulnerable_functions: [],
              vulnerable_version_range: ">= 4.5.0, < 4.5.3",
            },
            {
              first_patched_version: "4.3.6",
              package: {
                ecosystem: "pip",
                name: "redis",
              },
              vulnerable_functions: [],
              vulnerable_version_range: ">= 4.2.0, < 4.3.6",
            },
          ],
        },
        {
          cvss: {
            score: 5.3,
            vector_string: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N",
          },
          description: null,
          ghsa_id: "GHSA-cfj3-7x9c-4p3h",
          html_url: "https://github.com/advisories/GHSA-cfj3-7x9c-4p3h",
          identifiers: [
            {
              type: "GHSA",
              value: "GHSA-cfj3-7x9c-4p3h",
            },
            {
              type: "CVE",
              value: "CVE-2014-1829",
            },
          ],
          published_at: "2022-05-17T03:49:35Z",
          references: [
            "https://nvd.nist.gov/vuln/detail/CVE-2014-1829",
            "https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=733108",
            "http://advisories.mageia.org/MGASA-2014-0409.html",
            "http://www.debian.org/security/2015/dsa-3146",
            "http://www.ubuntu.com/usn/USN-2382-1",
            "https://github.com/advisories/GHSA-cfj3-7x9c-4p3h",
            "https://github.com/pypa/advisory-database/tree/main/vulns/requests/PYSEC-2014-13.yaml",
            "https://github.com/psf/requests/issues/1885",
            "https://web.archive.org/web/20150523055216/http://www.mandriva.com/en/support/security/advisories/advisory/MDVSA-2015:133/?name=MDVSA-2015:133",
            "https://github.com/kennethreitz/requests/issues/1885",
            "http://www.mandriva.com/security/advisories?name=MDVSA-2015:133",
          ],
          severity: "medium",
          source_code_location: "https://github.com/psf/requests",
          summary:
            "Exposure of Sensitive Information to an Unauthorized Actor in Requests",
          updated_at: "2024-10-26T22:35:30Z",
          url: "https://api.github.com/advisories/GHSA-cfj3-7x9c-4p3h",
          vulnerabilities: [
            {
              first_patched_version: "2.3.0",
              package: {
                ecosystem: "pip",
                name: "requests",
              },
              vulnerable_functions: [],
              vulnerable_version_range: "< 2.3.0",
            },
          ],
        },
        {
          cvss: {
            score: null,
            vector_string: null,
          },
          description: null,
          ghsa_id: "GHSA-652x-xj99-gmcc",
          html_url: "https://github.com/advisories/GHSA-652x-xj99-gmcc",
          identifiers: [
            {
              type: "GHSA",
              value: "GHSA-652x-xj99-gmcc",
            },
            {
              type: "CVE",
              value: "CVE-2014-1830",
            },
          ],
          published_at: "2022-05-14T02:09:22Z",
          references: [
            "https://nvd.nist.gov/vuln/detail/CVE-2014-1830",
            "https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=733108",
            "http://advisories.mageia.org/MGASA-2014-0409.html",
            "http://lists.opensuse.org/opensuse-updates/2016-01/msg00095.html",
            "http://www.debian.org/security/2015/dsa-3146",
            "https://github.com/pypa/advisory-database/tree/main/vulns/requests/PYSEC-2014-14.yaml",
            "https://github.com/psf/requests/issues/1885",
            "https://web.archive.org/web/20150523055216/http://www.mandriva.com/en/support/security/advisories/advisory/MDVSA-2015:133/?name=MDVSA-2015:133",
            "https://github.com/kennethreitz/requests/issues/1885",
            "http://www.mandriva.com/security/advisories?name=MDVSA-2015:133",
            "https://github.com/advisories/GHSA-652x-xj99-gmcc",
          ],
          severity: "medium",
          source_code_location: "https://github.com/psf/requests",
          summary:
            "Exposure of Sensitive Information to an Unauthorized Actor in Requests",
          updated_at: "2024-10-21T21:58:42Z",
          url: "https://api.github.com/advisories/GHSA-652x-xj99-gmcc",
          vulnerabilities: [
            {
              first_patched_version: "2.3.0",
              package: {
                ecosystem: "pip",
                name: "requests",
              },
              vulnerable_functions: [],
              vulnerable_version_range: "< 2.3.0",
            },
          ],
        },
        {
          cvss: {
            score: null,
            vector_string: null,
          },
          description: null,
          ghsa_id: "GHSA-pg2w-x9wp-vw92",
          html_url: "https://github.com/advisories/GHSA-pg2w-x9wp-vw92",
          identifiers: [
            {
              type: "GHSA",
              value: "GHSA-pg2w-x9wp-vw92",
            },
            {
              type: "CVE",
              value: "CVE-2015-2296",
            },
          ],
          published_at: "2022-05-13T01:11:23Z",
          references: [
            "https://nvd.nist.gov/vuln/detail/CVE-2015-2296",
            "http://advisories.mageia.org/MGASA-2015-0120.html",
            "http://lists.fedoraproject.org/pipermail/package-announce/2015-March/153594.html",
            "http://www.mandriva.com/security/advisories?name=MDVSA-2015:133",
            "http://www.openwall.com/lists/oss-security/2015/03/14/4",
            "http://www.openwall.com/lists/oss-security/2015/03/15/1",
            "http://www.ubuntu.com/usn/USN-2531-1",
            "https://github.com/psf/requests/commit/3bd8afbff29e50b38f889b2f688785a669b9aafc",
            "https://github.com/kennethreitz/requests/commit/3bd8afbff29e50b38f889b2f688785a669b9aafc",
            "https://github.com/pypa/advisory-database/tree/main/vulns/requests/PYSEC-2015-17.yaml",
            "https://warehouse.python.org/project/requests/2.6.0",
            "https://github.com/advisories/GHSA-pg2w-x9wp-vw92",
          ],
          severity: "medium",
          source_code_location: "https://github.com/psf/requests",
          summary: "Python Requests Session Fixation",
          updated_at: "2024-10-21T21:03:10Z",
          url: "https://api.github.com/advisories/GHSA-pg2w-x9wp-vw92",
          vulnerabilities: [
            {
              first_patched_version: "2.6.0",
              package: {
                ecosystem: "pip",
                name: "requests",
              },
              vulnerable_functions: [],
              vulnerable_version_range: ">= 2.1.0, < 2.6.0",
            },
          ],
        },
        {
          cvss: {
            score: 7.5,
            vector_string: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N",
          },
          description: null,
          ghsa_id: "GHSA-x84v-xcm2-53pg",
          html_url: "https://github.com/advisories/GHSA-x84v-xcm2-53pg",
          identifiers: [
            {
              type: "GHSA",
              value: "GHSA-x84v-xcm2-53pg",
            },
            {
              type: "CVE",
              value: "CVE-2018-18074",
            },
          ],
          published_at: "2018-10-29T19:06:46Z",
          references: [
            "https://nvd.nist.gov/vuln/detail/CVE-2018-18074",
            "https://github.com/requests/requests/issues/4716",
            "https://github.com/requests/requests/pull/4718",
            "https://github.com/requests/requests/commit/c45d7c49ea75133e52ab22a8e9e13173938e36ff",
            "https://access.redhat.com/errata/RHSA-2019:2035",
            "https://bugs.debian.org/910766",
            "http://docs.python-requests.org/en/master/community/updates/#release-and-version-history",
            "http://lists.opensuse.org/opensuse-security-announce/2019-07/msg00024.html",
            "https://www.oracle.com/security-alerts/cpujul2022.html",
            "https://github.com/pypa/advisory-database/tree/main/vulns/requests/PYSEC-2018-28.yaml",
            "https://usn.ubuntu.com/3790-1",
            "https://usn.ubuntu.com/3790-2",
            "https://github.com/advisories/GHSA-x84v-xcm2-53pg",
          ],
          severity: "high",
          source_code_location: "https://github.com/requests/requests",
          summary: "Insufficiently Protected Credentials in Requests",
          updated_at: "2024-10-21T21:26:18Z",
          url: "https://api.github.com/advisories/GHSA-x84v-xcm2-53pg",
          vulnerabilities: [
            {
              first_patched_version: "2.20.0",
              package: {
                ecosystem: "pip",
                name: "requests",
              },
              vulnerable_functions: [],
              vulnerable_version_range: "<= 2.19.1",
            },
          ],
        },
        {
          cvss: {
            score: 4,
            vector_string: "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:L/I:N/A:N",
          },
          description: null,
          ghsa_id: "GHSA-cm5g-3pgc-8rg4",
          html_url: "https://github.com/advisories/GHSA-cm5g-3pgc-8rg4",
          identifiers: [
            {
              type: "GHSA",
              value: "GHSA-cm5g-3pgc-8rg4",
            },
            {
              type: "CVE",
              value: "CVE-2024-10491",
            },
          ],
          published_at: "2024-10-29T18:30:37Z",
          references: [
            "https://nvd.nist.gov/vuln/detail/CVE-2024-10491",
            "https://www.herodevs.com/vulnerability-directory/cve-2024-10491",
            "https://github.com/expressjs/express/issues/6222",
            "https://github.com/advisories/GHSA-cm5g-3pgc-8rg4",
          ],
          severity: "medium",
          source_code_location: "https://github.com/expressjs/express",
          summary: "Express ressource injection",
          updated_at: "2024-12-19T17:52:11Z",
          url: "https://api.github.com/advisories/GHSA-cm5g-3pgc-8rg4",
          vulnerabilities: [
            {
              first_patched_version: "4.0.0-rc1",
              package: {
                ecosystem: "npm",
                name: "express",
              },
              vulnerable_functions: [],
              vulnerable_version_range: "<= 3.21.4",
            },
          ],
        },
        {
          cvss: {
            score: 4.7,
            vector_string: "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:N/A:N",
          },
          description: null,
          ghsa_id: "GHSA-jj78-5fmv-mv28",
          html_url: "https://github.com/advisories/GHSA-jj78-5fmv-mv28",
          identifiers: [
            {
              type: "GHSA",
              value: "GHSA-jj78-5fmv-mv28",
            },
            {
              type: "CVE",
              value: "CVE-2024-9266",
            },
          ],
          published_at: "2024-10-03T21:31:05Z",
          references: [
            "https://nvd.nist.gov/vuln/detail/CVE-2024-9266",
            "https://www.herodevs.com/vulnerability-directory/cve-2024-9266",
            "https://github.com/expressjs/express/compare/3.4.4...3.4.5",
            "https://github.com/advisories/GHSA-jj78-5fmv-mv28",
          ],
          severity: "low",
          source_code_location: "https://github.com/expressjs/express",
          summary: "Express Open Redirect vulnerability",
          updated_at: "2024-10-09T23:46:56Z",
          url: "https://api.github.com/advisories/GHSA-jj78-5fmv-mv28",
          vulnerabilities: [
            {
              first_patched_version: "4.0.0-rc1",
              package: {
                ecosystem: "npm",
                name: "express",
              },
              vulnerable_functions: [],
              vulnerable_version_range: ">= 3.4.5, < 4.0.0-rc1",
            },
          ],
        },
        {
          cvss: {
            score: 5,
            vector_string: "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:L/I:L/A:L",
          },
          description: null,
          ghsa_id: "GHSA-qw6h-vgh9-j6wx",
          html_url: "https://github.com/advisories/GHSA-qw6h-vgh9-j6wx",
          identifiers: [
            {
              type: "GHSA",
              value: "GHSA-qw6h-vgh9-j6wx",
            },
            {
              type: "CVE",
              value: "CVE-2024-43796",
            },
          ],
          published_at: "2024-09-10T19:41:04Z",
          references: [
            "https://github.com/expressjs/express/security/advisories/GHSA-qw6h-vgh9-j6wx",
            "https://nvd.nist.gov/vuln/detail/CVE-2024-43796",
            "https://github.com/expressjs/express/commit/54271f69b511fea198471e6ff3400ab805d6b553",
            "https://github.com/advisories/GHSA-qw6h-vgh9-j6wx",
          ],
          severity: "low",
          source_code_location: "https://github.com/expressjs/express",
          summary: "express vulnerable to XSS via response.redirect()",
          updated_at: "2024-11-18T16:27:12Z",
          url: "https://api.github.com/advisories/GHSA-qw6h-vgh9-j6wx",
          vulnerabilities: [
            {
              first_patched_version: "4.20.0",
              package: {
                ecosystem: "npm",
                name: "express",
              },
              vulnerable_functions: [],
              vulnerable_version_range: "< 4.20.0",
            },
            {
              first_patched_version: "5.0.0",
              package: {
                ecosystem: "npm",
                name: "express",
              },
              vulnerable_functions: [],
              vulnerable_version_range: ">= 5.0.0-alpha.1, < 5.0.0",
            },
          ],
        },
        {
          cvss: {
            score: 6.1,
            vector_string: "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N",
          },
          description: null,
          ghsa_id: "GHSA-rv95-896h-c2vc",
          html_url: "https://github.com/advisories/GHSA-rv95-896h-c2vc",
          identifiers: [
            {
              type: "GHSA",
              value: "GHSA-rv95-896h-c2vc",
            },
            {
              type: "CVE",
              value: "CVE-2024-29041",
            },
          ],
          published_at: "2024-03-25T19:40:26Z",
          references: [
            "https://github.com/expressjs/express/security/advisories/GHSA-rv95-896h-c2vc",
            "https://github.com/koajs/koa/issues/1800",
            "https://github.com/expressjs/express/pull/5539",
            "https://github.com/expressjs/express/commit/0867302ddbde0e9463d0564fea5861feb708c2dd",
            "https://github.com/expressjs/express/commit/0b746953c4bd8e377123527db11f9cd866e39f94",
            "https://expressjs.com/en/4x/api.html#res.location",
            "https://nvd.nist.gov/vuln/detail/CVE-2024-29041",
            "https://github.com/advisories/GHSA-rv95-896h-c2vc",
          ],
          severity: "medium",
          source_code_location: "https://github.com/expressjs/express",
          summary: "Express.js Open Redirect in malformed URLs",
          updated_at: "2024-03-27T21:47:29Z",
          url: "https://api.github.com/advisories/GHSA-rv95-896h-c2vc",
          vulnerabilities: [
            {
              first_patched_version: "4.19.2",
              package: {
                ecosystem: "npm",
                name: "express",
              },
              vulnerable_functions: [],
              vulnerable_version_range: "< 4.19.2",
            },
            {
              first_patched_version: "5.0.0-beta.3",
              package: {
                ecosystem: "npm",
                name: "express",
              },
              vulnerable_functions: [],
              vulnerable_version_range: ">= 5.0.0-alpha.1, < 5.0.0-beta.3",
            },
          ],
        },
        {
          cvss: {
            score: 6.1,
            vector_string: "CVSS:3.0/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N",
          },
          description: null,
          ghsa_id: "GHSA-gpvr-g6gh-9mc2",
          html_url: "https://github.com/advisories/GHSA-gpvr-g6gh-9mc2",
          identifiers: [
            {
              type: "GHSA",
              value: "GHSA-gpvr-g6gh-9mc2",
            },
            {
              type: "CVE",
              value: "CVE-2014-6393",
            },
          ],
          published_at: "2018-10-23T17:22:54Z",
          references: [
            "https://nvd.nist.gov/vuln/detail/CVE-2014-6393",
            "https://github.com/advisories/GHSA-gpvr-g6gh-9mc2",
            "https://www.npmjs.com/advisories/8",
            "https://bugzilla.redhat.com/show_bug.cgi?id=1203190",
          ],
          severity: "medium",
          source_code_location: "",
          summary: "No Charset in Content-Type Header in express",
          updated_at: "2023-02-01T05:03:41Z",
          url: "https://api.github.com/advisories/GHSA-gpvr-g6gh-9mc2",
          vulnerabilities: [
            {
              first_patched_version: "3.11.0",
              package: {
                ecosystem: "npm",
                name: "express",
              },
              vulnerable_functions: [],
              vulnerable_version_range: "< 3.11.0",
            },
            {
              first_patched_version: "4.5.0",
              package: {
                ecosystem: "npm",
                name: "express",
              },
              vulnerable_functions: [],
              vulnerable_version_range: ">= 4.0.0, < 4.5.0",
            },
          ],
        },
      ],
      testsuite: {
        files: [
          {
            content:
              "describe('get_file_tree', () => {\n  it('should fetch and cache the file tree', async () => {\n    const repo = 'test-user/test-repo';\n    const accessToken = 'test-token';\n    const cached = r.get(repo);\n    expect(cached).toBeNull();\n    const response = await get_file_tree(repo, accessToken);\n    const fileTree = r.get(repo);\n    expect(fileTree).toBeDefined();\n  });\n\n  it('should handle a repo not found error', async () => {\n    const repo = 'nonexistent-user/nonexistent-repo';\n    const accessToken = 'test-token';\n    await expect(async () => {\n      await get_file_tree(repo, accessToken);\n    }).rejects.toThrow('Not Found');\n  });\n});\n\ndescribe('get_dependencies', () => {\n  it('should fetch the dependencies for a project', async () => {\n    const repo = 'test-user/test-repo';\n    const accessToken = 'test-token';\n    const repoFileTree = await get_file_tree(repo, accessToken);\n    const modelResponse = await model.generate_content(\n      `Analyze the code and get me the list of dependencies of this project. If there are multiple languages/ecosystems in the project, create a list of dependencies for each. This is my code: ${repoFileTree}`,\n      {response_mime_type: 'application/json', response_schema: '[Dependencies]'}\n    );\n    const dependencyData = JSON.parse(modelResponse.text);\n    expect(dependencyData).toBeDefined();\n  });\n});\n\ndescribe('get_security_data', () => {\n  it('should fetch security data for a given project', async () => {\n    const dependencyData = {dependencies: [{dependency: 'test-dep', version: '1.0.0'}], ecosystem: 'npm'};\n    const accessToken = 'test-token';\n    const securityData = await get_security_data(dependencyData, accessToken);\n    expect(securityData).toBeDefined();\n  });\n});\n\ndescribe('generate_testsuite', () => {\n  it('should generate a test suite for the given codebase', async () => {\n    const fileTree = '//sample code';\n    const testsuite = await generate_testsuite(fileTree);\n    expect(testsuite).toBeDefined();\n  });\n});\n\ndescribe('generate_diagram', () => {\n  it('should generate a mermaid diagram for the given codebase', async () => {\n    const fileTree = '//sample code';\n    const diagram = await generate_diagram(fileTree);\n    expect(diagram).toBeDefined();\n  });\n});\n\ndescribe('generate_readme', () => {\n  it('should generate a README for the given codebase', async () => {\n    const fileTree = '//sample code';\n    const readme = await generate_readme(fileTree);\n    expect(readme).toBeDefined();\n  });\n});",
            file_path: "backend/test.js",
          },
        ],

        info: "",
      },
      diagram: {
        diagram_code:
          "graph LR\n A[User] --> B{Register/Login};\n B -- Register --> C[User Creation];\n C --> D[Email Verification];\n D --> E[User Authentication];\n E --> F[JWT Token Generation];\n F --> G[Frontend];\n G --> H[Problem Selection];\n H --> I[Code Editor];\n I --> J[Code Submission];\n J --> K[Backend];\n K --> L[Code Execution (Docker)];\n L --> M[Result];\n M --> G;\n G --> N[AI Assistant];\n N --> K;\n G --> O[Leaderboard];\n O --> K;\n G --> P[User Profile];\n P --> K;\n K --> Q[Database];\n Q --> K;\n G --> R[Editorials];\n R --> K; \n G -- Logout --> A; ",
        info: "The system starts with a User (A) who can register or log in (B). Registration leads to User Creation (C) followed by Email Verification (D). Successful authentication (E) generates a JWT token (F) for the Frontend (G). The Frontend handles Problem Selection (H), Code Editing (I), and Submission (J) of code to the Backend (K). The Backend manages Code Execution using Docker (L), receives Results (M), and interacts with the Database (Q). The Frontend also allows users to interact with an AI Assistant (N) and the Leaderboard (O), as well as view their User Profile (P) and Editorials (R), all of which interact with the Backend. Logout from (G) redirects the user back to the initial state (A)",
      },
      readme: {
        info: "",
        readme:
          "## Online IDE\n\nLeetcode-like platform to practice logic-based coding problems. Built using Express.js, React.js, PostgreSQL, and Docker containers for code execution.\n\n## Table of Contents\n\n- [Features](#features)\n- [Tech Stack](#tech-stack)\n- [How It Works](#how-it-works)\n- [Setup](#setup)\n - [Using Docker Compose](#using-docker-compose)\n - [Running Backend and Frontend Separately](#running-backend-and-frontend-separately)\n- [Contributing](#contributing)\n\n## Features\n\n- JWT Based User Authentication\n - Register\n - Login\n - Email token verification\n - Forgot password with OTP\n- Code Editor\n - Syntax Highlighting (with Shiki.js)\n - 4 Languages Supported (Python, C, C++, Java)\n - Problem Statements rendered as Markdown, with support for code blocks\n - Sample Test Cases for each problem with expected output\n - Custom test cases can be set by the user\n- Sandboxed Code Execution\n - Docker container for each code execution\n - Limit time used by code\n- Test code against sample test cases before submission\n- Verify output against hidden test cases\n- Persist code to local storage\n- AI Assistant\n - LLaMA will provide hints for the problem statement, with access to the code written by the user as context\n - Streaming response from the AI Assistant, for a more interactive experience\n- Points\n - +10 if the user solves a problem statement in the first submission\n - +5 if the user solves a problem statement in more than one submission\n - no points awarded if the user solves a problem statement correctly more than once\n- Leaderboard ranking based on points\n- User Profile\n - GitHub-like submission graph\n - Total submissions\n - Points earned\n - Problems solved\n- Editorials for each problem statement\n - Markdown rendered editorials\n - Code blocks in editorials\n - User can submit editorials after solving the problem statement\n- Critical endpoints are rate-limited to prevent abuse\n\n## Tech Stack\n\n- Express.js (Backend + Execution Worker)\n- Python (for code execution on the container)\n- React.js (Frontend)\n- Redis (for internal messaging, storing OTPs, saving code execution results)\n- PostgreSQL (with Prisma ORM)\n- Docker (with docker-compose)\n- Dockerode (for managing docker containers)\n- Resend (for sending emails)\n- Shadcn/UI (for frontend components)\n- Shiki.js with Monaco Editor (for code editing with syntax highlighting)\n- Meta LLaMA 3.1 8B (CloudFlare Workers AI)\n- GitHub Actions (for CI/CD)\n\n## How it works\n\n![Diagram](assets/flow-diagram.png)\n\n## Setup\n\nYou can either use the docker-compose file to run the project or run the backend and frontend separately.\n\n### Using Docker Compose\n\n- Clone the repository\n- Copy the `.env.example` file to `.env` and fill in the required values in both `frontend/` and `backend/` directories.\n- Run `docker compose up` in the root directory\n- The project will be running on `localhost:8000`\n\n### Running Backend and Frontend Separately\n\n> [!NOTE]\n> You will still need to have Docker installed on your system.\n\n- Clone the repository\n- Copy the `.env.example` file to `.env` and fill in the required values in both `frontend/` and `backend/` directories.\n- Run Redis\n - Run `docker run -d -p 6379:6379 redis`\n- Run Postgres\n - Run `docker run -d -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=onlineide postgres`\n- Run the backend server\n - Navigate to the `backend` directory\n - Run `npm install`\n - Run `npm run dev`\n- The backend server will be running on `localhost:3000`\n- Run the frontend server\n - Navigate to the `frontend` directory\n - Run `npm install`\n - Run `npm start`\n- The project will be running on `localhost:5173`\n\n## Contributing\n\nPull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.",
      },
    },
  });
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/repository/generate?repo=${slug}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data;
      setData(data.data);
      console.log(response.data);
    };
    fetchData();
  }, [slug]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="vulnerability" className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span className="hidden sm:inline">Vulnerability</span>
        </TabsTrigger>
        <TabsTrigger value="readme" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">README</span>
        </TabsTrigger>
        <TabsTrigger value="review" className="flex items-center gap-2">
          <GitPullRequest className="w-4 h-4" />
          <span className="hidden sm:inline">Test Case Generator</span>
        </TabsTrigger>
        <TabsTrigger value="chat" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Chat</span>
        </TabsTrigger>
        <TabsTrigger value="diagram" className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4" />
          <span className="hidden sm:inline">Diagram</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="vulnerability">
        <VulnerabilityAnalysis data={data.scan} />
      </TabsContent>
      <TabsContent value="readme">
        <ReadmeGenerator data={data.readme} />
      </TabsContent>
      <TabsContent value="review">
        <CodeReview data={data.testsuite} />
      </TabsContent>
      <TabsContent value="chat">
        <ChatWithRepo />
      </TabsContent>
      <TabsContent value="diagram">
        <FlowChartPage data={data.data?.diagram} />
      </TabsContent>
    </Tabs>
  );
}
