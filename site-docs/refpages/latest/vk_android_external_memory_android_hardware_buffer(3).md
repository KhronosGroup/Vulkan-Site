# VK_ANDROID_external_memory_android_hardware_buffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ANDROID_external_memory_android_hardware_buffer.html

## Table of Contents

- [Name](#_name)
- [VK_ANDROID_external_memory_android_hardware_buffer](#VK_ANDROID_external_memory_android_hardware_buffer)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Base Types](#_new_base_types)
- [New_Base_Types](#_new_base_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ANDROID_external_memory_android_hardware_buffer - device extension

**Name String**

`VK_ANDROID_external_memory_android_hardware_buffer`

**Extension Type**

Device extension

**Registered Extension Number**

130

**Revision**

5

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

         [VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html)

         and

         [VK_KHR_external_memory](VK_KHR_external_memory.html)

         and

         [VK_KHR_dedicated_allocation](VK_KHR_dedicated_allocation.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

and

[VK_EXT_queue_family_foreign](VK_EXT_queue_family_foreign.html)

**API Interactions**

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_KHR_format_feature_flags2

**Contact**

* 
Jesse Hall [critsec](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ANDROID_external_memory_android_hardware_buffer] @critsec%0A*Here describe the issue or question you have about the VK_ANDROID_external_memory_android_hardware_buffer extension*)

**Last Modified Date**

2021-09-30

**IP Status**

No known IP claims.

**Contributors**

* 
Ray Smith, ARM

* 
Lina Versace, Google

* 
Jesse Hall, Google

* 
Tobias Hector, Imagination

* 
James Jones, NVIDIA

* 
Tony Zlatinski, NVIDIA

* 
Matthew Netsch, Qualcomm

* 
Andrew Garrard, Samsung

This extension enables an application to import Android
`AHardwareBuffer` objects created outside of the Vulkan device into
Vulkan memory objects, where they **can** be bound to images and buffers.
It also allows exporting an `AHardwareBuffer` from a Vulkan memory
object for symmetry with other operating systems.
But since not all `AHardwareBuffer` usages and formats have Vulkan
equivalents, exporting from Vulkan provides strictly less functionality than
creating the `AHardwareBuffer` externally and importing it.

Some `AHardwareBuffer` images have implementation-defined *external
formats* that **may** not correspond to Vulkan formats.
Sampler Y′CBCR conversion **can** be used to sample from these images and
convert them to a known color space.

* 
`AHardwareBuffer`

* 
[vkGetAndroidHardwareBufferPropertiesANDROID](vkGetAndroidHardwareBufferPropertiesANDROID.html)

* 
[vkGetMemoryAndroidHardwareBufferANDROID](vkGetMemoryAndroidHardwareBufferANDROID.html)

* 
[VkAndroidHardwareBufferPropertiesANDROID](VkAndroidHardwareBufferPropertiesANDROID.html)

* 
[VkMemoryGetAndroidHardwareBufferInfoANDROID](VkMemoryGetAndroidHardwareBufferInfoANDROID.html)

* 
Extending [VkAndroidHardwareBufferPropertiesANDROID](VkAndroidHardwareBufferPropertiesANDROID.html):

[VkAndroidHardwareBufferFormatPropertiesANDROID](VkAndroidHardwareBufferFormatPropertiesANDROID.html)

Extending [VkImageCreateInfo](VkImageCreateInfo.html), [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html), [VkAttachmentDescription2](VkAttachmentDescription2.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html):

* 
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)

Extending [VkImageFormatProperties2](VkImageFormatProperties2.html):

* 
[VkAndroidHardwareBufferUsageANDROID](VkAndroidHardwareBufferUsageANDROID.html)

Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

* 
[VkImportAndroidHardwareBufferInfoANDROID](VkImportAndroidHardwareBufferInfoANDROID.html)

If [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
Extending [VkAndroidHardwareBufferPropertiesANDROID](VkAndroidHardwareBufferPropertiesANDROID.html):

[VkAndroidHardwareBufferFormatProperties2ANDROID](VkAndroidHardwareBufferFormatProperties2ANDROID.html)

* 
`VK_ANDROID_EXTERNAL_MEMORY_ANDROID_HARDWARE_BUFFER_EXTENSION_NAME`

* 
`VK_ANDROID_EXTERNAL_MEMORY_ANDROID_HARDWARE_BUFFER_SPEC_VERSION`

* 
Extending [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html):

[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_FORMAT_PROPERTIES_ANDROID](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_PROPERTIES_ANDROID](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_USAGE_ANDROID](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_FORMAT_ANDROID](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMPORT_ANDROID_HARDWARE_BUFFER_INFO_ANDROID](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_GET_ANDROID_HARDWARE_BUFFER_INFO_ANDROID](VkStructureType.html)

If [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_FORMAT_PROPERTIES_2_ANDROID](VkStructureType.html)

1) Other external memory objects are represented as weakly-typed handles
(e.g. Win32 `HANDLE` or POSIX file descriptor), and require a handle type
parameter along with handles.
`AHardwareBuffer` is strongly typed, so naming the handle type is
redundant.
Does symmetry justify adding handle type parameters/fields anyway?

**RESOLVED**: No.
The handle type is already provided in places that treat external memory
objects generically.
In the places we would add it, the application code that would have to
provide the handle type value is already dealing with
`AHardwareBuffer`-specific commands/structures; the extra symmetry
would not be enough to make that code generic.

2) The internal layout and therefore size of a `AHardwareBuffer`
image may depend on native usage flags that do not have corresponding Vulkan
counterparts.
Do we provide this information to [vkCreateImage](vkCreateImage.html) somehow, or allow the
allocation size reported by [vkGetImageMemoryRequirements](vkGetImageMemoryRequirements.html) to be
approximate?

**RESOLVED**: Allow the allocation size to be unspecified when allocating the
memory.
It has to work this way for exported image memory anyway, since
`AHardwareBuffer` allocation happens in [vkAllocateMemory](vkAllocateMemory.html), and
internally is performed by a separate HAL, not the Vulkan implementation
itself.
There is a similar issue with [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html): the layout
is determined by the allocator HAL, so it is not known until the image is
bound to memory.

3) Should the result of sampling an external-format image with the suggested
Y′CBCR conversion parameters yield the same results as using a
`samplerExternalOES` in OpenGL ES?

**RESOLVED**: This would be desirable, so that apps converting from OpenGL ES
to Vulkan could get the same output given the same input.
But since sampling and conversion from Y′CBCR images is so loosely defined
in OpenGL ES, multiple implementations do it in a way that does not conform
to Vulkan’s requirements.
Modifying the OpenGL ES implementation would be difficult, and would change
the output of existing unmodified applications.
Changing the output only for applications that are being modified gives
developers the chance to notice and mitigate any problems.
Implementations are encouraged to minimize differences as much as possible
without causing compatibility problems for existing OpenGL ES applications
or violating Vulkan requirements.

4) Should an `AHardwareBuffer` with `AHARDWAREBUFFER_USAGE_CPU_*`
usage be mappable in Vulkan? Should it be possible to export an
`AHardwareBuffers` with such usage?

**RESOLVED**: Optional, and mapping in Vulkan is not the same as
`AHardwareBuffer_lock`.
The semantics of these are different: mapping in memory is persistent, just
gives a raw view of the memory contents, and does not involve ownership.
`AHardwareBuffer_lock` gives the host exclusive access to the buffer, is
temporary, and allows for reformatting copy-in/copy-out.
Implementations are not required to support host-visible memory types for
imported Android hardware buffers or resources backed by them.
If a host-visible memory type is supported and used, the memory can be
mapped in Vulkan, but doing so follows Vulkan semantics: it is just a raw
view of the data and does not imply ownership (this means implementations
must not internally call `AHardwareBuffer_lock` to implement
[vkMapMemory](vkMapMemory.html), or assume the application has done so).
Implementations are not required to support linear-tiled images backed by
Android hardware buffers, even if the `AHardwareBuffer` has CPU
usage.
There is no reliable way to allocate memory in Vulkan that can be exported
to a `AHardwareBuffer` with CPU usage.

5) Android may add new `AHardwareBuffer` formats and usage flags over
time.
Can reference to them be added to this extension, or do they need a new
extension?

**RESOLVED**: This extension can document the interaction between the new AHB
formats/usages and existing Vulkan features.
No new Vulkan features or implementation requirements can be added.
The extension version number will be incremented when this additional
documentation is added, but the version number does not indicate that an
implementation supports Vulkan memory or resources that map to the new
`AHardwareBuffer` features: support for that must be queried with
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) or is implied by
successfully allocating a `AHardwareBuffer` outside of Vulkan that
uses the new feature and has a GPU usage flag.

In essence, these are new features added to a new Android API level, rather
than new Vulkan features.
The extension will only document how existing Vulkan features map to that
new Android feature.

* 
Revision 5, 2022-02-04 (Chris Forbes)

Describe mapping of flags for storage image support

Revision 4, 2021-09-30 (Jon Leech)

* 
Add interaction with `[VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html)` to `vk.xml`

Revision 3, 2019-08-27 (Jon Leech)

* 
Update revision history to correspond to XML version number

Revision 2, 2018-04-09 (Petr Kraus)

* 
Markup fixes and remove incorrect Draft status

Revision 1, 2018-03-04 (Jesse Hall)

* 
Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ANDROID_external_memory_android_hardware_buffer).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
