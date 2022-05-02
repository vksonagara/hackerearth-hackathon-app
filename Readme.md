# Kubera mobile app

This is a mono repository to maintain code for Kubera mobile app

## Backend Setup in emulator

- Once the AVD is initially setup, open your terminal, and find your installation path of Android Studio.

  - For MacOS, this should be under `~/Library/Android/sdk`
  - For Windows, this should be `C:\Users<username>\AppData\Local\Android\sdk`

- Once in that path, you want to run a specific emulator command:

  - `./emulator/emulator -writable-system -netdelay none -netspeed full -avd <AVDName>`

- Once you’re done with running the emulator, open a new tab and run the following commands (in a folder you want to have the host file within):

  - `adb root`
  - `adb remount`
  - `adb pull /system/etc/hosts`

- Upon running these commands, you’ll find a hosts file. This file is the file that tells your OS what path a given domain has. Please edit the file and add a new line
  with 10.0.2.2 and Backend url without http.

- Once you’ve made the changes to the host file that you want to have changed, you’ll have to push the host file to the OS of the AVD:

  - `adb push ./hosts /etc/hosts`
  - `adb push ./hosts /etc/system/hosts`
  - `adb push ./hosts /system/etc/hosts`

- In order for the changes to the host file to take effect, you’ll have to restart the emulator. In order to do so, you’ll want to press and hold the power button off to the right of the emulator. Then, press “Restart”.

## Command to reset watchman and npm cache

`watchman watch-del-all && rm -rf node_modules/ && npm install && npm start -- --reset-cache`
