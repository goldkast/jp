---
when:
  fileChanged: cursor-command.txt
then:
  - readFile: cursor-command.txt
  - extractInstruction: true
  - applyInstructionToFile: true
  - saveFile: true
---
