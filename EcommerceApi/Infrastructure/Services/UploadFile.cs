using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Infrastructure.Services
{
    public class UploadFile
    {
        public UploadFile()
        {

        }
        public string UploadedFile(IFormFile formFile, List<string> path)
        {
            string uniqueFileName = null;

            if (formFile != null)
            {
                path.Insert(0, Directory.GetCurrentDirectory());
                path.Insert(1, "wwwroot");
                string uploadsFolder = Path.Combine(path.ToArray());
                uniqueFileName = Guid.NewGuid().ToString() + "_" + formFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    formFile.CopyTo(fileStream);
                }
            }
            return uniqueFileName;
        }
    }
}
