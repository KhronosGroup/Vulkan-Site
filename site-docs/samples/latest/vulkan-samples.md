# Vulkan Samples

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/README.html

## Table of Contents

- [Introduction](#_introduction)
- [Requirements](#_requirements)
- [Goals](#_goals)
- [Samples](#_samples)
- [General information](#_general_information)
- [Setup](#_setup)
- [Build](#_build)
- [Supported Platforms](#_supported_platforms)
- [Usage](#_usage)
- [License](#_license)
- [Trademarks](#_trademarks)
- [Contributions](#_contributions)
- [Related resources](#_related_resources)

## Content

![Vulkan Samples banner](_images/banner.jpg)

The Vulkan Samples is collection of resources to help you develop optimized Vulkan applications.

If you are new to Vulkan the [API samples](samples/api/README.html) are the right place to start.
Additionally you may find the following links useful:

* 
[Vulkan Guide](../../guide/latest/index.html)

* 
[Get Started in Vulkan](../../tutorial/latest/00_Introduction.html)

[Performance samples](samples/performance/README.html) show the recommended best practice together with real-time profiling information.
They are more advanced but also contain a detailed tutorial with more in-detail explanations.

The samples are written in C++ and require a compiler that supports at least C++20. To run the samples, a device that supports at least Vulkan 1.1 or newer is required. Some samples might require a higher Vulkan version and/or support for certain extensions.

* 
Create a collection of resources that demonstrate best-practice recommendations in Vulkan

* 
Create tutorials that explain the implementation of best-practices and include performance analysis guides

* 
[Listing of all samples available in this repository](samples/README.html)

* 
**Project Basics**

[Controls](docs/misc.html#controls)

* 
[Debug window](docs/misc.html#debug-window)

* 
[Create a Sample](scripts/README.html)

**Vulkan Essentials**

* 
[How does Vulkan compare to OpenGL ES?
What should you expect when targeting Vulkan?](samples/vulkan_basics.html)

**Misc**

* 
[Driver version](docs/misc.html#driver-version)

* 
[Memory limits](docs/memory_limits.html)

Prerequisites: [git](https://git-scm.com/downloads) with [git large file storage (git-lfs)](https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage).

Clone the repo with submodules using the following command:

git clone --recurse-submodules https://github.com/KhronosGroup/Vulkan-Samples.git
cd Vulkan-Samples

Follow build instructions for your platform below.

|  | The full repository is very large, and some ISPs appear to have trouble
| --- | --- |
providing a robust connection to github while the clone is being made.

If you notice problems such as submodules downloading at reported rates in
the tens of kB/s, or fatal timeout errors occurring, these may be due to
network routing issues to github within your ISP’s internal network, rather
than anything wrong in your own networking setup.

It can be very difficult to get ISPs to acknowledge such problems exist, much
less to fix them.

One workaround is to switch the repository to use ssh protocol prior to the
submodule download, which can be done via e.g.

git clone git@github.com:KhronosGroup/Vulkan-Samples.git
cd Vulkan-Samples
perl -i -p -e 's\|https://(.*?)/\|git@\1:\|g' .gitmodules
git submodule sync
git submodule update

While this can be a good alternative if you are running into this connection
issue, you must have GitHub ssh key authentication setup to use ssh
protocol - see
[Connecting
to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) for details.
So it is a not a solution we can implement as the repository default.

Another option which may help is to run github through a VPN service. |

* 
Windows - [Build Guide](docs/build.html#windows)

* 
Linux - [Build Guide](docs/build.html#linux)

* 
Android - [Build Guide](docs/build.html#android)

* 
macOS - [Build Guide](docs/build.html#macos)

* 
iOS - [Build Guide](docs/build.html#ios)

The following shows some example command line usage on how to configure and run the Vulkan Samples.

> 

Make sure that you are running the samples from the root directory of the repository.
Otherwise the samples will not be able to find the assets.
./build/app/bin///vulkan_samples

# For the entire usage use
vulkan_samples --help

# For subcommand usage use
vulkan_samples  --help

# Run Swapchain Images sample
vulkan_samples sample swapchain_images

# Run AFBC sample in benchmark mode for 5000 frames
vulkan_samples sample afbc --benchmark --stop-after-frame 5000

# Run compute nbody using headless-surface and take a screenshot of frame 5
# Note: headless-surface uses VK_EXT_headless_surface.
# This will create a surface and a Swapchain, but present will be a no op.
# The extension is supported by Swiftshader(https://github.com/google/swiftshader).
# It allows to quickly test content in environments without a GPU.
vulkan_samples sample compute_nbody --headless-surface --screenshot 5

# Run all the performance samples for 10 seconds in each configuration
vulkan_samples batch --category performance --duration 10

# Run Swapchain Images sample on an Android device
adb shell am start-activity -n com.khronos.vulkan_samples/com.khronos.vulkan_samples.SampleLauncherActivity -e sample swapchain_images

See [LICENSE](LICENSE).

This project has several [third-party dependencies](#./third_party/README.adoc)

This project uses assets from [vulkan-samples-assets](https://github.com/KhronosGroup/Vulkan-Samples-Assets).
Each one has its own license.

Vulkan is a registered trademark of the Khronos Group Inc.

Donated to Khronos by Arm, with further contributions by Sascha Willems and Adam Sawicki.
See [CONTRIBUTORS](CONTRIBUTORS.html) for the full contributor list.

Also see [CONTRIBUTING](CONTRIBUTING.html) for contribution guidelines.

* 
[Mali GPU Best Practices](https://developer.arm.com/documentation/101897/latest/): A document with recommendations for efficient API usage
