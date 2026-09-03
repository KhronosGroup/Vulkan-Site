# Platforms

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/platforms.html

## Table of Contents

- [Android](#_android)
- [BSD Unix](#_bsd_unix)
- [Fuchsia](#_fuchsia)
- [iOS](#_ios)
- [Linux](#_linux)
- [MacOS](#_macos)
- [Nintendo Switch](#_nintendo_switch)
- [QNX](#_qnx)
- [Windows](#_windows)
- [Others](#_others)

## Content

While Vulkan runs on many platforms, each has small variations on how Vulkan is managed.

![platforms_overview.png](_images/platforms_overview.png)

The Vulkan API is [available](https://developer.android.com/ndk/guides/graphics/getting-started) on any Android device starting with API level 24 (Android Nougat), however not all devices will have a Vulkan driver.

Android uses its [Hardware Abstraction Layer (HAL)](https://source.android.com/devices/architecture/hal) to find the Vulkan Driver in a [predefined path](https://source.android.com/devices/graphics/implement-vulkan#driver_emun).

All 64-bit devices that were released with API level 29 (Android Q) or later must include a Vulkan 1.1 driver.

Vulkan is supported on many BSD Unix distributions.

Vulkan is supported on the [Fuchsia operation system](https://fuchsia.dev/fuchsia-src/development/graphics/magma/concepts/vulkan).

Vulkan is not natively supported on iOS, but can still be targeted with [Vulkan Portability Tools](portability_initiative.html#portability-initiative).

Vulkan is supported on many Linux distributions.

Vulkan is not natively supported on MacOS, but can still be targeted with [Vulkan Portability Tools](portability_initiative.html#portability-initiative).

The Nintendo Switch runs an NVIDIA Tegra chipset that supports native Vulkan.

Vulkan is supported on QNX operation system.

Vulkan is supported on Windows 7, Windows 8, Windows 10, and Windows 11.

Some embedded systems support Vulkan by allowing presentation [directly-to-display](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#display).
