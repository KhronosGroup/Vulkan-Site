# VkPhysicalDeviceBufferDeviceAddressFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceBufferDeviceAddressFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceBufferDeviceAddressFeatures - Structure describing buffer address features that can be supported by an implementation

The `VkPhysicalDeviceBufferDeviceAddressFeatures` structure is defined
as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceBufferDeviceAddressFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           bufferDeviceAddress;
    VkBool32           bufferDeviceAddressCaptureReplay;
    VkBool32           bufferDeviceAddressMultiDevice;
} VkPhysicalDeviceBufferDeviceAddressFeatures;

// Provided by VK_KHR_buffer_device_address
// Equivalent to VkPhysicalDeviceBufferDeviceAddressFeatures
typedef VkPhysicalDeviceBufferDeviceAddressFeatures VkPhysicalDeviceBufferDeviceAddressFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`bufferDeviceAddress` indicates that the implementation supports
accessing buffer memory in shaders as storage buffers via an address
queried from [vkGetBufferDeviceAddress](vkGetBufferDeviceAddress.html).

* 

`bufferDeviceAddressCaptureReplay` indicates that the implementation
supports saving and reusing buffer and device addresses, e.g. for trace
capture and replay.

* 

`bufferDeviceAddressMultiDevice` indicates that the implementation
supports the `bufferDeviceAddress`
, `rayTracingPipeline` and `rayQuery` features
for logical devices created with multiple physical devices.
If this feature is not supported, buffer
and acceleration structure
addresses **must** not be queried on a logical device created with more
than one physical device.

|  | `bufferDeviceAddressMultiDevice` exists to allow certain legacy
| --- | --- |
platforms to be able to support `bufferDeviceAddress` without needing to
support shared GPU virtual addresses for multi-device configurations. |

See [vkGetBufferDeviceAddress](vkGetBufferDeviceAddress.html) for more information.

If the `VkPhysicalDeviceBufferDeviceAddressFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceBufferDeviceAddressFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceBufferDeviceAddressFeatures-sType-sType) VUID-VkPhysicalDeviceBufferDeviceAddressFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceBufferDeviceAddressFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
