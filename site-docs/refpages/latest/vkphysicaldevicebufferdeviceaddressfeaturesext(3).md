# VkPhysicalDeviceBufferDeviceAddressFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceBufferDeviceAddressFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceBufferDeviceAddressFeaturesEXT - Structure describing buffer address features that can be supported by an implementation

The `VkPhysicalDeviceBufferDeviceAddressFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_buffer_device_address
typedef struct VkPhysicalDeviceBufferDeviceAddressFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           bufferDeviceAddress;
    VkBool32           bufferDeviceAddressCaptureReplay;
    VkBool32           bufferDeviceAddressMultiDevice;
} VkPhysicalDeviceBufferDeviceAddressFeaturesEXT;

// Provided by VK_EXT_buffer_device_address
// Equivalent to VkPhysicalDeviceBufferDeviceAddressFeaturesEXT
typedef VkPhysicalDeviceBufferDeviceAddressFeaturesEXT VkPhysicalDeviceBufferAddressFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `bufferDeviceAddress` indicates
that the implementation supports accessing buffer memory in shaders as
storage buffers via an address queried from
[vkGetBufferDeviceAddressEXT](vkGetBufferDeviceAddress.html).

* 

`bufferDeviceAddressCaptureReplay` indicates that the implementation
supports saving and reusing buffer addresses, e.g. for trace capture and
replay.

* 

`bufferDeviceAddressMultiDevice` indicates that the implementation
supports the [    `bufferDeviceAddress`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressEXT) feature for logical devices created with
multiple physical devices.
If this feature is not supported, buffer addresses **must** not be queried
on a logical device created with more than one physical device.

If the `VkPhysicalDeviceBufferDeviceAddressFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceBufferDeviceAddressFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

|  | The `VkPhysicalDeviceBufferDeviceAddressFeaturesEXT` structure has the
| --- | --- |
same members as the `VkPhysicalDeviceBufferDeviceAddressFeatures`
structure, but the functionality indicated by the members is expressed
differently.
The features indicated by the
`VkPhysicalDeviceBufferDeviceAddressFeatures` structure requires
additional flags to be passed at memory allocation time, and the capture and
replay mechanism is built around opaque capture addresses for buffer and
memory objects. |

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceBufferDeviceAddressFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceBufferDeviceAddressFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_buffer_device_address](VK_EXT_buffer_device_address.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceBufferDeviceAddressFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
