# VK_VALVE_buffer_device_address_allocation_alignment(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_VALVE_buffer_device_address_allocation_alignment.html

## Table of Contents

- [Name](#_name)
- [VK_VALVE_buffer_device_address_allocation_alignment](#VK_VALVE_buffer_device_address_allocation_alignment)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_VALVE_buffer_device_address_allocation_alignment - device extension

**Name String**

`VK_VALVE_buffer_device_address_allocation_alignment`

**Extension Type**

Device extension

**Registered Extension Number**

710

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html)

or

[Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**Special Use**

* 
[D3D support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Hans-Kristian Arntzen [HansKristian-Work](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_VALVE_buffer_device_address_allocation_alignment] @HansKristian-Work%0A*Here describe the issue or question you have about the VK_VALVE_buffer_device_address_allocation_alignment extension*)

**Last Modified Date**

2026-08-26

**IP Status**

No known IP claims.

**Contributors**

* 
Hans-Kristian Arntzen, Valve

* 
Connor Abbott, Valve

This extension allows applications to specify the alignment of any buffer
device address allocation, beyond the current specification requirements
which only requires that the memory has enough alignment to satisfy any
alignment request the implementation may require on its own.

When layering some other APIs, e.g. D3D12, applications are sometimes able
to rely on the allocated buffer device address being aligned to a
potentially larger alignment than what the implementation would normally
allocate for.
Some applications rely on this implementation detail and will behave in
unexpected ways if tighter alignments are used.
[vkAllocateMemory](vkAllocateMemory.html) as well as sparse buffer creation is affected by this
and this extension adds extra requirements on the implementation when
requested by application.

* 
Extending [VkBufferCreateInfo](VkBufferCreateInfo.html), [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

[VkBufferDeviceAddressAlignmentAllocateInfoVALVE](VkBufferDeviceAddressAlignmentAllocateInfoVALVE.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentFeaturesVALVE](VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentFeaturesVALVE.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentPropertiesVALVE](VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentPropertiesVALVE.html)

* 
`VK_VALVE_BUFFER_DEVICE_ADDRESS_ALLOCATION_ALIGNMENT_EXTENSION_NAME`

* 
`VK_VALVE_BUFFER_DEVICE_ADDRESS_ALLOCATION_ALIGNMENT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_ALIGNMENT_ALLOCATE_INFO_VALVE](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_ALLOCATION_ALIGNMENT_FEATURES_VALVE](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_ALLOCATION_ALIGNMENT_PROPERTIES_VALVE](VkStructureType.html)

* 
Revision 1, 2026-08-26 (Hans-Kristian Arntzen)

Initial specification

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_VALVE_buffer_device_address_allocation_alignment).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
