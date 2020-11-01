01.11.2020:
 * Last week:
  - Bugs, macOsx, Youtube vid, arch diagram
 * Next Week:
  - Start drafting the blog
  - Availability: For small corrections: yes for minor changes
  - Anoop: kickstart with HyperledgerExplorer meeting
  - Minor improvements in UI
  - Anoop: Commits signing


27.10.2020:
  * Last week:
    - Release when version is bumped automatically, release download for zip
    - Anoop: To followup with Vipin to get code to hyperledgerlabs
  * Next week:
    - Anoop: To test release
    - Improve documentation:
      - new gif - video, arch diagram
      - additions to text instructions
      - release to have platform specific name (linux/amd64)
      - release also for MacOS (darwin/amd64)
    - Start drafting blog
    - Question: Availability for small corrections after mentorship prog. had ended

18.10.2020:
   * Last week:
      - Hyperledger Explorer: needs to re-implement with TypeScripts
      - IBM cloud: Has a good UI which works. Google, AWS not so good, usual procedure.
         - Does not give the certificates for the users
      - Anoop: Issue is reproducible
   * This week
      - Anoop: Chat with Vipin about Hyperledger Explorer
      - Blog post: how to run easyDoser on localhost
      - Bash script - start the project, tierdown project

13.10.2020:
 * Last week:
   - Deploy easydoser on k8s
   - Issue: peer binary does not connect: error getting endorser client for channel: endorser client failed to connect to 52.246.248.192:7051: failed to create new connection: context deadline exceeded
 * This week:
   - Deploy easydoser on k8s
   - Check how easydoser can integrate to Hyperledger Explorer: start script in explorer. 
      - Option 1: Launch as a new window
      - Option 2: Re-implement easyDoser to TypeScript: Not recommended: 3-4 weeks
   - Check Managed services of Hyperledger fabric in AWS, Azure, Google Cloud, IBM cloud
   - Anoop: To test the above problem
   - Anoop: Chat with Vipin about Hyperledger Explorer

04.10.2020:
 * Last week:
   - CI tests, readme, cleanup code, proj plan update
 * This week:
   - Deploy easydoser on k8s
   - Anoop: To test: Verify all func. dockerize branch
   - Try with HF managed services (Azure/IBM/AWS)
   - Anoop: Check the bash script, any ideas?
   - Check: https://jira.hyperledger.org/browse/FAB-5094 (private data history), https://jira.hyperledger.org/browse/FAB-11732 (page through private data)

27.09.2020
 * Last week:
   - Github actions improvements (3 tests, JS mocha+chai)
   - Merge branches
 * This week:
   - Anoop: To test: Verify all func. dockerize branch
   - Try with HF managed services (Azure/IBM/AWS)
   - Update documentation
   - Check project plan
   - Close open issues
   - prepare for open source: cleanup, security

20.09.2020
 * Last week:
   - Hyperledger labs: sponsor agreed
   - Push Error to frontend
   - Same code base for docker vs. non-docker version (Also WebUI). +1
 * This week:
   - Anoop: suggestion: Try to push the bare container to hub.docker.com
   - Anoop: To test: Verify all func. dockerize branch
   - Write tests: server, github actions, testnetwork/fabcar
   - Bug: Approve and commit tab shows error on first few seconds only
   - Also update documentation

13.09.2020
 * Last week:
  - Dockerized backend and frontend
  - WebUI in production mode - ongoing
  - GitHub actions - not started
  - try to push docker functionality - done
  - Arch diagram - not started
 * This week:
  - readme.md: Docker as default, optional set of instructions for running without docker
  - Push the error to frontend
  - Fix current errors
  - Anoop: To test and raise bugs


06.09.2020
 * Last week:
   - branch: File picker (for the certs)
   - docker: try with fully working docker solution
 * This week:
   - CI: GitHub actions: Get easydoser testing running
   - Push the error to frontend
   - WebUI in production mode
   - Try to push docker functionality
   - Arch diagram: refine
   - Notes:
      - Docker func for webui and server should be optional
      - HF can exist in cloud and peer, other binaries and certs exist in local computer
      - Cloud testing needs dns resolution working
   - 

30.08.2020
 * Last week:
   - Marked the completed ones below
 * This week:
   - updated docs about the testing instructions
   - certificates paths: 
      - peer needs cli
      - sdk: missing: channel/collections policy, docker cli, store in cookies, bash script prompting from user (-> file/path to copy), etc.
   - Anoop: To test the latest code
   - Docker: npm production mode: compress node_modules to html/js (prod build?)
   - Cookie: approach in a different branch and compare the Usability


23.08.2020
 * Last week:
   - Improved UI
   - Done: Update the Project plan - before Friday
 * This week:
   - Make 1 vid for UI + 1 vid for cli - hyperledger labs - done
   - update diagrams: proposal + readme.md - done
   - If any enhancements, please do it in proposal + readme.md - done
   - Learn Functional testing for reactJS - done
   - Anoop: Start finding ways to get a sponsor
   - Anoop/Abhimanyu: Start thinking about dockerizing ui -> server (api) -> bash -> peer(HLF)
   - Ease the way to get the certificate paths - open



16.08.2020
 * General: Placement trainings on-going, an Exam done
 * Last Week:
   - Demo, Endorsement policy approvals
 * Anoop: Didnt test anything last week, will do so this week.
 * This week:
   - Push the latest code to master
   - Some user documentation
   - Fix all cosmetic/minor bugs
   - Clean-up frontend code
   - Update the Project plan - before Friday
   - Milestone 3 - More to be discussed and planned
     - Start with CI (GitHub actions) and tests (no unit tests but functional)
     - Testing - Try to find some frameworks which can functional test reactJS.
     - Docker containers - start with containerizing web, api-server+scripts later on
   - Milestone 4 - Some 3rd party cloud server

09.08.2020
 * General: Placement training ends early sept 2020.
 * Last week: 
   - demo, restructured server code, commiting chaincode.
 * Anoop: To test the existing setup and give comments/bugs
 * This week:
   - Reading endorsement policy
   - Updating endorsement policy

02.08.2020
 * Demo: check readiness
 * Anoop: To test with 2 peers 2 orgs in private browser windows
 * This week:
   - Implement commit
   - Updating channel definitions

27.07.2020
 * Demo: update collection def.
 * Anoop: approval/commit per user (edit paths)
 * This week:
   - Improved logging
   - Approving PDC
 * This week:
   - Check peer approval (if possible) + commit definition
   - update channel definition if there is time.
   - Take a look at bugs


19.07.2020
* Demoed PDC - RO (RW scripts ready UI integration pending)
* Anoop to get back on how approval/commit process work for RW scenarios
* Last week:
  - UI PDC RO, RW backend scripts 
* This week:
  - Take a look at channel definition
  - Improving logging/error handling
  - Clean up Front End code

12.07.2020
* Discuss about the release 0.1, what needs to be included, timeline etc.
  - 0.1 release - W/R of private collections
* Final submission - blog, white paper etc.
* Try to deploy our solution on atleast 1 cloud vendor with HF managed service
  - Try it at the end of phase - 2
* Last week:
  - reading pdc
  - Improved UI
  - Bug fixes
* Next week:
  - PDC update: text box that accepts JSON from user
  - Update endorsement policies - if possible


05.07.2020
 * cli containers deprecated, Fabric specific dirs are obtained from client(UI)
 * Big changes - shell scripts etc.
 * Next weeks tasks:
   - how to implement the same for private data collections - Need path for chaincode
   - Anoop to test and report bugs for some-test-network

28.06.2020
 * Demoed the UI (R/O) - looks good
 * Next weeks tasks
   - Anoop to test and report on a different netwotk
   - Study about Implementing UI for R/O private data collections
   - Add small hands-on instructions on how to deploy easy-doser on an existing hyperledger network.


21.06.2020
* demoed basic UI - looks good
* Next weeks task
  - Parse hyperledger json + crypt the certificate
  - First deadline: try to get pdc - readOnly
  - pdc for single peer vs. multipeer

14.06.2020
* Project plan submitted - 12.06.2020
* Agreed to create issues and mark them.
* Mailing lists and search
* Did architecture diagram
* My vacations: Full july

07.06.2020
* Project plan
  - Deadline: on/before 15.06
  - add from requirements.md (based on feasibility)

* Pre-MVP (v0.0.1)
  - Fabricv2.x docker-compose env
  - fabric-node-sdk
  - Peer query
  - 21.06.2020 - rough deadline
  
