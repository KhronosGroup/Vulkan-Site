# VK_AMD_buffer_marker(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_buffer_marker.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_buffer_marker](#VK_AMD_buffer_marker)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMD_buffer_marker - device extension

**Name String**

`VK_AMD_buffer_marker`

**Extension Type**

Device extension

**Registered Extension Number**

180

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**API Interactions**

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_KHR_synchronization2

**Special Use**

* 
[Developer tools](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Daniel Rakos [drakos-amd](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_buffer_marker] @drakos-amd%0A*Here describe the issue or question you have about the VK_AMD_buffer_marker extension*)

**Last Modified Date**

2018-01-26

**IP Status**

No known IP claims.

**Contributors**

* 
Matthaeus G. Chajdas, AMD

* 
Jaakko Konttinen, AMD

* 
Daniel Rakos, AMD

This extension adds a new operation to execute pipelined writes of small
marker values into a `VkBuffer` object.

The primary purpose of these markers is to facilitate the development of
debugging tools for tracking which pipelined command contributed to device
loss.

* 
[vkCmdWriteBufferMarkerAMD](vkCmdWriteBufferMarkerAMD.html)

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_synchronization2](VK_KHR_synchronization2.html) is supported:

* 
[vkCmdWriteBufferMarker2AMD](vkCmdWriteBufferMarker2AMD.html)

* 
`VK_AMD_BUFFER_MARKER_EXTENSION_NAME`

* 
`VK_AMD_BUFFER_MARKER_SPEC_VERSION`

None.

* 
Revision 1, 2018-01-26 (Jaakko Konttinen)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_buffer_marker).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
