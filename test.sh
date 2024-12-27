# 로그 파일 생성 및 시작 시간 기록
echo "=== Installation started at $(date) ===" > log.txt

echo "Installing dependencies..." | tee -a log.txt
pnpm install >> log.txt 2>&1

ssh ...awsip,id,pwd key

echo "Starting the project..." | tee -a log.txt
pnpm run dev:server >> log.txt 2>&1
pnpm run dev:client >> log.txt 2>&1

echo "Done!" | tee -a log.txt
echo "=== Installation completed at $(date) ===" >> log.txt

