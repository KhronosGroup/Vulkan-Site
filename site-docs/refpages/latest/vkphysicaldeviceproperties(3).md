# VkPhysicalDeviceProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceProperties - Structure specifying physical device properties

The `VkPhysicalDeviceProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPhysicalDeviceProperties {
    uint32_t                            apiVersion;
    uint32_t                            driverVersion;
    uint32_t                            vendorID;
    uint32_t                            deviceID;
    VkPhysicalDeviceType                deviceType;
    char                                deviceName[VK_MAX_PHYSICAL_DEVICE_NAME_SIZE];
    uint8_t                             pipelineCacheUUID[VK_UUID_SIZE];
    VkPhysicalDeviceLimits              limits;
    VkPhysicalDeviceSparseProperties    sparseProperties;
} VkPhysicalDeviceProperties;

* 
`apiVersion` is the version of Vulkan supported by the device,
encoded as described in [Version Numbers](../../../../spec/latest/chapters/extensions.html#extendingvulkan-coreversions-versionnumbers).

* 
`driverVersion` is the vendor-specified version of the driver.

* 
`vendorID` is a unique identifier for the *vendor* (see below) of
the physical device.

* 
`deviceID` is a unique identifier for the physical device among
devices available from the vendor.

* 
`deviceType` is a [VkPhysicalDeviceType](VkPhysicalDeviceType.html) specifying the type of
device.

* 
`deviceName` is an array of [VK_MAX_PHYSICAL_DEVICE_NAME_SIZE](VK_MAX_PHYSICAL_DEVICE_NAME_SIZE.html)
`char` containing a null-terminated UTF-8 string which is the name of
the device.

* 
`pipelineCacheUUID` is an array of [VK_UUID_SIZE](VK_UUID_SIZE.html) `uint8_t`
values representing a universally unique identifier for the device.

* 
`limits` is the [VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html) structure specifying
device-specific limits of the physical device.
See [Limits](../../../../spec/latest/chapters/limits.html#limits) for details.

* 
`sparseProperties` is the [VkPhysicalDeviceSparseProperties](VkPhysicalDeviceSparseProperties.html)
structure specifying various sparse related properties of the physical
device.
See [Sparse Properties](../../../../spec/latest/chapters/sparsemem.html#sparsememory-physicalprops) for details.

|  | The value of `apiVersion` **may** be different than the version returned by
| --- | --- |
[vkEnumerateInstanceVersion](vkEnumerateInstanceVersion.html); either higher or lower.
In such cases, the application **must** not use functionality that exceeds the
version of Vulkan associated with a given object.
The `pApiVersion` parameter returned by [vkEnumerateInstanceVersion](vkEnumerateInstanceVersion.html)
is the version associated with a [VkInstance](VkInstance.html) and its children, except
for a [VkPhysicalDevice](VkPhysicalDevice.html) and its children.
`VkPhysicalDeviceProperties`::`apiVersion` is the version associated
with a [VkPhysicalDevice](VkPhysicalDevice.html) and its children. |

|  | The encoding of `driverVersion` is implementation-defined.
| --- | --- |
It **may** not use the same encoding as `apiVersion`.
Applications should follow information from the *vendor* on how to extract
the version information from `driverVersion`. |

On implementations that claim support for the [Roadmap 2022](../../../../spec/latest/appendices/roadmap.html#roadmap-2022)
profile, the major and minor version expressed by `apiVersion` **must** be
at least Vulkan 1.3.

The `vendorID` and `deviceID` fields are provided to allow
applications to adapt to device characteristics that are not adequately
exposed by other Vulkan queries.

|  | These **may** include performance profiles, hardware errata, or other
| --- | --- |
characteristics. |

The *vendor* identified by `vendorID` is the entity responsible for the
most salient characteristics of the underlying implementation of the
[VkPhysicalDevice](VkPhysicalDevice.html) being queried.

|  | For example, in the case of a discrete GPU implementation, this **should** be
| --- | --- |
the GPU chipset vendor.
In the case of a hardware accelerator integrated into a system-on-chip
(SoC), this **should** be the supplier of the silicon IP used to create the
accelerator. |

If the vendor has a [PCI
vendor ID](https://pcisig.com/membership/member-companies), the low 16 bits of `vendorID` **must** contain that PCI vendor
ID, and the remaining bits **must** be zero.
Otherwise, the value returned **must** be a valid Khronos vendor ID, obtained
as described in the [Vulkan Documentation and Extensions: Procedures and Conventions](../../../../spec/latest/chapters/introduction.html#vulkan-styleguide) document in the section “Registering a Vendor
ID with Khronos”.
Khronos vendor IDs are allocated starting at 0x10000, to distinguish them
from the PCI vendor ID namespace.
Khronos vendor IDs are symbolically defined in the [VkVendorId](VkVendorId.html) type.

The vendor is also responsible for the value returned in `deviceID`.
If the implementation is driven primarily by a [PCI
device](https://pcisig.com/) with a [PCI device ID](https://pcisig.com/), the low 16 bits of
`deviceID` **must** contain that PCI device ID, and the remaining bits
**must** be zero.
Otherwise, the choice of what values to return **may** be dictated by operating
system or platform policies - but **should** uniquely identify both the device
version and any major configuration options (for example, core count in the
case of multicore devices).

|  | The same device ID **should** be used for all physical implementations of that
| --- | --- |
device version and configuration.
For example, all uses of a specific silicon IP GPU version and configuration
**should** use the same device ID, even if those uses occur in different SoCs. |

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html), [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html), [VkPhysicalDeviceSparseProperties](VkPhysicalDeviceSparseProperties.html), [VkPhysicalDeviceType](VkPhysicalDeviceType.html), [vkGetPhysicalDeviceProperties](vkGetPhysicalDeviceProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPhysicalDeviceProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
