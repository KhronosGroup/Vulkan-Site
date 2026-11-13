# WSIheaders(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/WSIheaders.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

WSIheaders - Control inclusion of window system interface extensions

To use a Vulkan extension supporting a platform-specific window system,
header files for that window system **must** be included at compile time, or
platform-specific types **must** be forward-declared.
The Vulkan header files are unable to determine whether or not an external
header is available at compile time, so platform-specific extensions are
provided in separate headers from the core API and platform-independent
extensions, allowing applications to decide which ones they need to be
defined and how the external headers are included.

Extensions dependent on particular sets of platform headers, or that
forward-declare platform-specific types, are declared in a header named for
that platform.
Before including these platform-specific Vulkan headers, applications **must**
include both `vulkan_core.h` and any external native headers the platform
extensions depend on.

As a convenience for applications that do not need the flexibility of
separate platform-specific Vulkan headers, `vulkan.h` includes
`vulkan_core.h`, and then conditionally includes platform-specific Vulkan
headers and the external headers they depend on.
Applications control which platform-specific headers are included by
#defining macros before including `vulkan.h`.

The correspondence between platform-specific extensions, external headers
they require, the platform-specific header which declares them, and the
preprocessor macros which enable inclusion by `vulkan.h` are shown in
the [following table](../../../../spec/latest/appendices/boilerplate.html#boilerplate-wsi-header-table).

| Extension Name | Window System Name | Platform-specific Header | Required External Headers | Controlling `vulkan.h` Macro |
| --- | --- | --- | --- | --- |
| Android |
| Wayland |
| Microsoft Windows |
| X11 Xcb |
| X11 Xlib |
| DirectFB |
| X11 XRAndR |
| Google Games Platform |
| iOS |
| macOS |
| OHOS |
| VI |
| Fuchsia |
| Metal on CoreAnimation |
| QNX Screen |

|  | This section describes the purpose of the headers independently of the
| --- | --- |
specific underlying functionality of the window system extensions
themselves.
Each extension name will only link to a description of that extension when
viewing a specification built with that extension included. |

[provisional-headers](provisional-headers.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/boilerplate.html#boilerplate-wsi-header).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
