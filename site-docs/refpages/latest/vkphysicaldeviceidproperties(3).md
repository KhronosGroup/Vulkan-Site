# VkPhysicalDeviceIDProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceIDProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceIDProperties - Structure specifying IDs related to the physical device

The `VkPhysicalDeviceIDProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceIDProperties {
    VkStructureType    sType;
    void*              pNext;
    uint8_t            deviceUUID[VK_UUID_SIZE];
    uint8_t            driverUUID[VK_UUID_SIZE];
    uint8_t            deviceLUID[VK_LUID_SIZE];
    uint32_t           deviceNodeMask;
    VkBool32           deviceLUIDValid;
} VkPhysicalDeviceIDProperties;

// Provided by VK_KHR_external_fence_capabilities, VK_KHR_external_memory_capabilities, VK_KHR_external_semaphore_capabilities
// Equivalent to VkPhysicalDeviceIDProperties
typedef VkPhysicalDeviceIDProperties VkPhysicalDeviceIDPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceUUID` is an array of [VK_UUID_SIZE](VK_UUID_SIZE.html) `uint8_t` values
representing a universally unique identifier for the device.

* 
`driverUUID` is an array of [VK_UUID_SIZE](VK_UUID_SIZE.html) `uint8_t` values
representing a universally unique identifier for the driver build in use
by the device.

* 
`deviceLUID` is an array of [VK_LUID_SIZE](VK_LUID_SIZE.html) `uint8_t` values
representing a locally unique identifier for the device.

* 
`deviceNodeMask` is a `uint32_t` bitfield identifying the node
within a linked device adapter corresponding to the device.

* 
`deviceLUIDValid` is a boolean value that will be [VK_TRUE](VK_TRUE.html) if
`deviceLUID` contains a valid LUID and `deviceNodeMask` contains
a valid node mask, and [VK_FALSE](VK_FALSE.html) if they do not.

If the `VkPhysicalDeviceIDProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

`deviceUUID` **must** be immutable for a given device across instances,
processes, driver APIs, driver versions, and system reboots.

Applications **can** compare the `driverUUID` value across instance and
process boundaries, and **can** make similar queries in external APIs to
determine whether they are capable of sharing memory objects and resources
using them with the device.

`deviceUUID` and/or `driverUUID` **must** be used to determine whether
a particular external object can be shared between driver components, where
such a restriction exists as defined in the compatibility table for the
particular object type:

* 
[External memory handle    types compatibility](../../../../spec/latest/chapters/capabilities.html#external-memory-handle-types-compatibility)

* 
[External semaphore    handle types compatibility](../../../../spec/latest/chapters/capabilities.html#external-semaphore-handle-types-compatibility)

* 
[External fence handle types    compatibility](../../../../spec/latest/chapters/capabilities.html#external-fence-handle-types-compatibility)

If `deviceLUIDValid` is [VK_FALSE](VK_FALSE.html), the values of `deviceLUID`
and `deviceNodeMask` are **undefined**.
If `deviceLUIDValid` is [VK_TRUE](VK_TRUE.html) and Vulkan is running on the
Windows operating system, the contents of `deviceLUID` **can** be cast to
an `LUID` object and **must** be equal to the locally unique identifier of a
`IDXGIAdapter1` object that corresponds to `physicalDevice`.
If `deviceLUIDValid` is [VK_TRUE](VK_TRUE.html), `deviceNodeMask` **must**
contain exactly one bit.
If Vulkan is running on an operating system that supports the Direct3D 12
API and `physicalDevice` corresponds to an individual device in a linked
device adapter, `deviceNodeMask` identifies the Direct3D 12 node
corresponding to `physicalDevice`.
Otherwise, `deviceNodeMask` **must** be `1`.

|  | Although they have identical descriptions,
| --- | --- |
[VkPhysicalDeviceIDProperties](#)::`deviceUUID` may differ from
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)::`properties.pipelineCacheUUID`.
The former is intended to identify and correlate devices across API and
driver boundaries, while the latter is used to identify a compatible device
and driver combination to use when serializing and de-serializing pipeline
state.

Implementations **should** return `deviceUUID` values which are likely to
be unique even in the presence of multiple Vulkan implementations (such as a
GPU driver and a software renderer; two drivers for different GPUs; or the
same Vulkan driver running on two logically different devices).

Khronos' conformance testing is unable to guarantee that `deviceUUID`
values are actually unique, so implementors **should** make their own best
efforts to ensure this.
In particular, hard-coded `deviceUUID` values, especially all-`0` bits,
**should** never be used.

A combination of values unique to the vendor, the driver, and the hardware
environment can be used to provide a `deviceUUID` which is unique to a
high degree of certainty.
Some possible inputs to such a computation are:

* 
Information reported by [vkGetPhysicalDeviceProperties](vkGetPhysicalDeviceProperties.html)

* 
PCI device ID (if defined)

* 
PCI bus ID, or similar system configuration information.

* 
Driver binary checksums. |

|  | While [VkPhysicalDeviceIDProperties](#)::`deviceUUID` is specified to
| --- | --- |
remain consistent across driver versions and system reboots, it is not
intended to be usable as a serializable persistent identifier for a device.
It may change when a device is physically added to, removed from, or moved
to a different connector in a system while that system is powered down.
Further, there is no reasonable way to verify with conformance testing that
a given device retains the same UUID in a given system across all driver
versions supported in that system.
While implementations should make every effort to report consistent device
UUIDs across driver versions, applications should avoid relying on the
persistence of this value for uses other than identifying compatible devices
for external object sharing purposes. |

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceIDProperties-sType-sType) VUID-VkPhysicalDeviceIDProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ID_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_external_fence_capabilities](VK_KHR_external_fence_capabilities.html), [VK_KHR_external_memory_capabilities](VK_KHR_external_memory_capabilities.html), [VK_KHR_external_semaphore_capabilities](VK_KHR_external_semaphore_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPhysicalDeviceIDProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
