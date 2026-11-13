# Miscellaneous

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/docs/misc.html

## Table of Contents

- [Controls](#_controls)
- [Debug Window](#_debug_window)
- [Driver version](#_driver_version)

## Content

| Action | Desktop | Mobile |
| --- | --- | --- |
| Move around the scene | WASD | press + hold |
| Rotate camera | right mouse button + drag | press + move |
| Pan | left mouse button + drag | - |
| Movement speed reduced | shift | - |
| Movement speed increased | ctrl | - |
| toggle GUI | left click | tap |
| toggle Debug Window | right click | 2 finger tap |

The Debug Window shows information about the current application.

![Debug Window](../_images/docs/images/debug-window.png)

The debug window shows the driver version of the GPU, which follows the [Vulkan semantics](https://registry.khronos.org/vulkan/specs/latest/html/chap44.html#extendingvulkan-coreversions-versionnumbers), with a major, minor, and patch number.
New versions of the driver will increment these numbers.

The framework is able to get these values by calling `vkGetPhysicalDeviceProperties(physical_device, &properties)`.
This will set all attributes of properties, which type is `struct VkPhysicalDeviceProperties`.
Then it extracts the relevant bits from `properties.driverVersion` using the following Vulkan macros:

VK_VERSION_MAJOR(properties.driverVersion);
VK_VERSION_MINOR(properties.driverVersion);
VK_VERSION_PATCH(properties.driverVersion);

It is important to note that old Arm Mali drivers (before Bifrost r14 and Midgard r26) may not implement this feature, therefore the values returned will be undefined.
